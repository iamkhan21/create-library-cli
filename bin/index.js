#!/usr/bin/env node

import { exec } from "child_process";
import { green, red } from "nanocolors";
import fs from "fs";
import inquirer from "inquirer";
import path, { dirname } from "path";
import { Transform } from "stream";
import { fileURLToPath } from "url";
import { QUESTIONS_1, QUESTIONS_2 } from "./questions.js";
import micoSpinner from "mico-spinner";

const __dirname = dirname(fileURLToPath(import.meta.url));

const immutableFilesForCoping = [
  "codecov.yml",
  ".prettierignore",
  ".nvmrc",
  ".editorconfig",
];

const transformFactory = (transformFn) =>
  new Transform({
    transform(chunk, encoding, callback) {
      const modified = transformFn(chunk);
      callback(null, modified);
    },
  });

const fillLicense = (year, author) =>
  transformFactory((chunk) => {
    const regex = /<{year}, {copyright holder}>/gm;
    let subst = `${year}, ${author}`;
    return chunk.toString().replace(regex, subst);
  });

const licenses = {
  MIT: {
    from: "templates/licenses/mit.txt",
    transform: fillLicense,
  },
  "Apache-2.0": {
    from: "templates/licenses/apache.txt",
    transform: null,
  },
  "GPL-3.0": {
    from: "templates/licenses/gnu.txt",
    transform: null,
  },
  "BSD-2-Clause": {
    from: "templates/licenses/bsd2.txt",
    transform: fillLicense,
  },
  "BSD-3-Clause": {
    from: "templates/licenses/bsd3.txt",
    transform: fillLicense,
  },
  "BSD-4-Clause": {
    from: "templates/licenses/bsd4.txt",
    transform: fillLicense,
  },
};

function copyFile({ from, to, transform = null }) {
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(from);

    if (transform) {
      stream = stream.pipe(transform);
    }

    stream
      .pipe(fs.createWriteStream(to))
      .on("finish", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

function createProjectDirectoryAndInsertFiles({
  projectPath,
  projectName,
  licenseType,
  projectDesc,
  authorName,
  authorEmail,
  authorGithub,
}) {
  const templatePath = path.join(__dirname, "../");

  const currentYear = new Date().getFullYear();

  fs.mkdirSync(`${projectPath}/src/numbers`, { recursive: true });
  fs.mkdirSync(`${projectPath}/swc_configs/main`, { recursive: true });
  fs.mkdirSync(`${projectPath}/swc_configs/module`, { recursive: true });
  fs.mkdirSync(`${projectPath}/.github/workflows`, { recursive: true });

  const license = licenses[licenseType];

  const promises = [
    copyFile({
      from: `${templatePath}/templates/package.txt`,
      transform: transformFactory((chunk) => {
        return chunk
          .toString()
          .replace(/<name>/gm, projectName)
          .replace(/<description>/gm, projectDesc)
          .replace(/<author>/gm, `${authorName} <${authorEmail}>`)
          .replace(/<license>/gm, licenseType)
          .replace(
            /<repository>/gm,
            `https://github.com/${authorGithub}/${projectName}.git`
          );
      }),
      to: `${projectPath}/package.json`,
    }),
    copyFile({
      from: `${templatePath}${license.from}`,
      transform:
        license.transform && license.transform(currentYear, authorName),
      to: `${projectPath}/LICENSE`,
    }),
    copyFile({
      from: `${templatePath}/templates/template_gitignore.txt`,
      to: `${projectPath}/.gitignore`,
    }),
    copyFile({
      from: `${templatePath}/templates/.eslintignore`,
      to: `${projectPath}/.eslintignore`,
    }),
    copyFile({
      from: `${templatePath}/templates/.eslintrc`,
      to: `${projectPath}/.eslintrc`,
    }),
    copyFile({
      from: `${templatePath}/templates/tsconfig.json`,
      to: `${projectPath}/tsconfig.json`,
    }),
    copyFile({
      from: `${templatePath}/templates/jest.config.ts`,
      to: `${projectPath}/jest.config.ts`,
    }),
    copyFile({
      from: `${templatePath}/templates/swc_configs/main/.swcrc`,
      to: `${projectPath}/swc_configs/main/.swcrc`,
    }),
    copyFile({
      from: `${templatePath}/templates/swc_configs/module/.swcrc`,
      to: `${projectPath}/swc_configs/module/.swcrc`,
    }),
    copyFile({
      from: `${templatePath}/templates/src/index.ts`,
      to: `${projectPath}/src/index.ts`,
    }),
    copyFile({
      from: `${templatePath}/templates/src/numbers/double.test.ts`,
      to: `${projectPath}/src/numbers/double.test.ts`,
    }),
    copyFile({
      from: `${templatePath}/templates/src/numbers/double.ts`,
      to: `${projectPath}/src/numbers/double.ts`,
    }),

    copyFile({
      from: `${templatePath}/templates/CI.yml`,
      to: `${projectPath}/.github/workflows/CI.yml`,
    }),
    copyFile({
      from: `${templatePath}/templates/README.md`,
      transform: transformFactory((chunk) => {
        return chunk
          .toString()
          .replace(/{project name}/gm, projectName)
          .replace(/{description}/gm, projectDesc);
      }),
      to: `${projectPath}/README.md`,
    }),
    copyFile({
      from: `${templatePath}/templates/FUNDING.yml`,
      transform: transformFactory((chunk) => {
        return chunk.toString().replace(/<github>/gm, authorGithub);
      }),
      to: `${projectPath}/.github/FUNDING.yml`,
    }),
  ];

  for (const file of immutableFilesForCoping) {
    promises[promises.length] = copyFile({
      from: `${templatePath}${file}`,
      to: `${projectPath}/${file}`,
    });
  }

  return Promise.allSettled(promises);
}

(async () => {
  const {
    "project-name": projectName,
    "license-type": licenseType,
    "project-desc": projectDesc,
  } = await inquirer.prompt(QUESTIONS_1);

  let spinner = micoSpinner("Loading github profile").start();

  const { stdout: name } = await sh("git config --get user.name");
  const { stdout: email } = await sh("git config --get user.email");

  spinner.succeed();

  const {
    "author-name": authorName,
    "author-email": authorEmail,
    "author-github": authorGithub,
  } = await inquirer.prompt(QUESTIONS_2({ name, email }));

  spinner = micoSpinner("Scaffold the project").start();

  const projectPath = path.join(process.cwd(), projectName);

  await createProjectDirectoryAndInsertFiles({
    projectPath,
    projectName,
    licenseType,
    projectDesc,
    authorName,
    authorEmail,
    authorGithub,
  });

  spinner.succeed();

  spinner = micoSpinner("Installing project dependencies").start();

  try {
    await sh(`cd ${projectPath} && npm i`);

    spinner.succeed();

    console.log(green("Project ready to use. Have a good time :)"));
  } catch (e) {
    spinner.fail();
    console.log(red(`Error: ${e}`));
  }
})();
