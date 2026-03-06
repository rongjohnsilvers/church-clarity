export const churchData = {
  id: "5bafd4b4cc34e72c96a97918",
  name: "City Church San Francisco",
  location: "San Francisco, CA",
  denomination: "Non-denominational",
  website: "https://citychurchsf.org",
  lastUpdated: "January 12, 2024",

  lgbtq: {
    score: "Clear: Affirming" as const,
    // How the score is computed:
    // "Clear" = policy is prominently communicated on primary pages or via openly LGBTQ+ pastoral leadership
    // "Affirming" = no restrictions on LGBTQ+ individuals in hiring, marriage, ordination, or leadership
    policyQuestions: [
      {
        question: "Does this church hire LGBTQ+ individuals in any ministry role, including pastoral positions?",
        answer: true,
        sourceNote: "Stated explicitly on their staff & hiring page",
      },
      {
        question: "Does this church perform same-sex wedding ceremonies?",
        answer: true,
        sourceNote: "Listed under 'Weddings & Ceremonies' on their main website",
      },
      {
        question: "Are LGBTQ+ individuals eligible for ordination at this church?",
        answer: true,
        sourceNote: "Ordination policy page confirms no restrictions",
      },
      {
        question: "Does this church have openly LGBTQ+ individuals serving in pastoral or leadership roles?",
        answer: true,
        sourceNote: "Current lead pastor is openly gay — visible on primary homepage",
      },
    ],
  },

  womenInLeadership: {
    score: "Unclear: Egalitarian" as const,
    // How the score is computed:
    // "Egalitarian" = women permitted at all leadership levels including senior pastor
    // "Unclear" = policies allow women but LACK adequate representation:
    //             less than 1 female pastor on staff OR less than 50% non-male governance
    policyQuestions: [
      {
        question: "Are women permitted to preach and teach mixed-gender congregations?",
        answer: true,
        sourceNote: "Confirmed via church newsletter archive",
      },
      {
        question: "Are women eligible for ordination at this church?",
        answer: true,
        sourceNote: "Ordination page does not restrict by gender",
      },
      {
        question: "Can women serve on the elder board or governing body?",
        answer: true,
        sourceNote: "Elder board page lists one female elder out of seven",
      },
      {
        question: "Can a woman serve as the senior or lead pastor?",
        answer: true,
        sourceNote: "No restriction found in any official policy",
      },
    ],
    // Why "Unclear" despite all "Yes" answers:
    clarityGap:
      "While the church's policies are fully egalitarian, their current staff and governance do not yet demonstrate adequate representation: only 1 of 7 elders (14%) are women, and no women currently serve in pastoral staff roles.",
  },
};

export const nonAffirmingChurchData = {
  id: "example-non-affirming",
  name: "Cornerstone Community Church",
  location: "Nashville, TN",
  denomination: "Southern Baptist Convention",
  website: "https://cornerstonenashville.org",
  lastUpdated: "February 3, 2024",

  lgbtq: {
    score: "Clear: Non-Affirming" as const,
    policyQuestions: [
      {
        question: "Does this church hire LGBTQ+ individuals in any ministry role, including pastoral positions?",
        answer: false,
        sourceNote: "Staff hiring page states marriage is between a man and woman only",
      },
      {
        question: "Does this church perform same-sex wedding ceremonies?",
        answer: false,
        sourceNote: "Wedding policy page explicitly limits ceremonies to opposite-sex couples",
      },
      {
        question: "Are LGBTQ+ individuals eligible for ordination at this church?",
        answer: false,
        sourceNote: "Ordination requirements reference SBC's Faith & Message statement",
      },
      {
        question: "Does this church have openly LGBTQ+ individuals serving in pastoral or leadership roles?",
        answer: false,
        sourceNote: "No such representation found across website, social media, or staff directory",
      },
    ],
  },

  womenInLeadership: {
    score: "Clear: Non-Egalitarian" as const,
    policyQuestions: [
      {
        question: "Are women permitted to preach and teach mixed-gender congregations?",
        answer: false,
        sourceNote: "Doctrinal statement restricts preaching role to male elders",
      },
      {
        question: "Are women eligible for ordination at this church?",
        answer: false,
        sourceNote: "Ordination page specifies male elders only, consistent with SBC guidelines",
      },
      {
        question: "Can women serve on the elder board or governing body?",
        answer: false,
        sourceNote: "Elder board page lists 8 members, all male",
      },
      {
        question: "Can a woman serve as the senior or lead pastor?",
        answer: false,
        sourceNote: "Explicitly excluded in the church's publicly posted governance document",
      },
    ],
  },
};

export type ChurchData = typeof churchData;
export type LgbtqScore =
  | "Clear: Affirming"
  | "Clear: Non-Affirming"
  | "Unclear: Affirming"
  | "Unclear: Non-Affirming"
  | "Undisclosed"
  | "Actively Discerning"
  | "Verified Clear";
export type WomenScore =
  | "Clear: Egalitarian"
  | "Clear: Non-Egalitarian"
  | "Unclear: Egalitarian"
  | "Unclear: Non-Egalitarian"
  | "Undisclosed"
  | "Verified Clear";
