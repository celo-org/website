export var ApplicationFields;
(function (ApplicationFields) {
    ApplicationFields["org"] = "Organization Name";
    ApplicationFields["url"] = "Organization URL";
    ApplicationFields["about"] = "Tell us about your organization in a sentence";
    ApplicationFields["product"] = "What does your organization do?";
    ApplicationFields["founderEmail"] = "Founder email filling out application";
    ApplicationFields["coFounderEmail"] = "Cofounder emails (if relevant)";
    ApplicationFields["video"] = "Optional: URL of a simple 1 minute unlisted YouTube, Vimeo, or Youku video introducing the founder(s)";
})(ApplicationFields || (ApplicationFields = {}));
export const ApplicationKeys = Object.keys(ApplicationFields);
export var RecommendationFields;
(function (RecommendationFields) {
    RecommendationFields["email"] = "Your Email Address";
    RecommendationFields["org"] = "Organization you are Recommending";
    RecommendationFields["founderEmail"] = "One founder\u2019s email";
    RecommendationFields["founderName"] = "One founder's name";
    RecommendationFields["why"] = "Why do you recommend this applicant?";
})(RecommendationFields || (RecommendationFields = {}));
export const RecommendationKeys = Object.keys(RecommendationFields);
export var Tables;
(function (Tables) {
    Tables["Applicants"] = "Applicants";
    Tables["Recommendations"] = "Referrals";
})(Tables || (Tables = {}));
//# sourceMappingURL=EcoFundFields.js.map