const { Expecial_Senders, IgnoreTypes } = require("./constants.js");

module.exports.cl = (text) => {
  if (!text) return "";
  if (text === Expecial_Senders.Github_Action_Bot.org)
    return Expecial_Senders.Github_Action_Bot.want;
  if (text === Expecial_Senders.Vercel_Bot.org)
    return Expecial_Senders.Vercel_Bot.want;
  if (IgnoreTypes.includes(text)) return text;
  return text
    .replace("_", "\\_")
    .replace("*", "\\*")
    .replace("[", "\\[")
    .replace("]", "\\]");
};
module.exports.capitalizeFirstLetter = (string) => {
  return string.replace(/^./, string[0].toUpperCase());
};
