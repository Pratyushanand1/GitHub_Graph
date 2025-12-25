const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");

const git = simpleGit("C:/Users/ironp/OneDrive/Desktop/GitHub_Graph");

const makeCommit = async (n) => {
  if (n === 0) {
    const branch = (await git.branch()).current;
    await git.push("origin", branch, ["-u"]);
    console.log("✅ All commits pushed successfully");
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);

  const DATE = moment()
    .subtract(1, "y")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date: DATE };
  console.log("Commit date:", DATE);

  await jsonfile.writeFile(FILE_PATH, data);

  await git.add(FILE_PATH);
  await git.commit(DATE, { "--date": DATE });

  await makeCommit(n - 1);
};

makeCommit(120).catch(console.error);
