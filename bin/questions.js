export const QUESTIONS_1 = [
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "project-desc",
    type: "input",
    message: "Project description:",
  },
  {
    name: "license-type",
    type: "list",
    message: "License type:",
    choices: [
      "MIT",
      "Apache-2.0",
      "GPL-3.0",
      "BSD-2-Clause",
      "BSD-3-Clause",
      "BSD-4-Clause",
    ],
  }
];

export const QUESTIONS_2 = ({ name, email }) => [
  {
    name: "author-name",
    type: "input",
    message: "Author name:",
    default: name?.trim(),
  },
  {
    name: "author-email",
    type: "input",
    message: "Author email:",
    default: email?.trim(),
  },
  {
    name: "author-github",
    type: "input",
    message: "Author github nickname (need for configuration package.json):",
  },
];

