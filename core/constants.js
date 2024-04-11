module.exports.Expecial_Senders = {
  Github_Action_Bot: { org: "github-actions[bot]", want: "github-actions-bot" },
  Vercel_Bot: { org: "vercel[bot]", want: "vercel-bot" },
};
module.exports.IgnoreTypes = [
  "issue_comment",
  "commit_comment",
  "pull_request",
  "deployment_status",
];
