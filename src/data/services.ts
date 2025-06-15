
export const schemes = [
  {
    id: "pmsvanidhi",
    name: "PM SVANidhi",
    icon: "🏦",
    description: "Collateral-free micro-credit loans for urban street vendors.",
    link: "https://pmsvanidhi.mohua.gov.in/"
  },
  {
    id: "vendorid",
    name: "Vendor ID",
    icon: "📄",
    description: "Get your official street vendor identification instantly.",
    link: "#"
  },
  {
    id: "fssai",
    name: "FSSAI License",
    icon: "🧾",
    description: "Food safety registration for food-vending vendors.",
    link: "https://foodlicensing.fssai.gov.in/"
  },
  {
    id: "pmjdy",
    name: "PM Jan Dhan Yojana",
    icon: "🏦",
    description: "Open a zero-balance bank account for financial security.",
    link: "https://pmjdy.gov.in/"
  }
];

export const applications = [
  {
    id: "001",
    type: "Vendor ID",
    stages: [
      { label: "Submitted", status: "done", date: "2024-06-06" },
      { label: "In Review", status: "active", date: null },
      { label: "Approved", status: "pending", date: null }
    ]
  },
  {
    id: "002",
    type: "PM SVANidhi",
    stages: [
      { label: "Submitted", status: "done", date: "2024-06-01" },
      { label: "In Review", status: "done", date: "2024-06-07" },
      { label: "Rejected", status: "fail", date: "2024-06-08" }
    ]
  }
];

export const docTypes = [
  { id: "aadhar", label: "Aadhaar Card" },
  { id: "svcert", label: "Street Vendor Certificate" },
  { id: "license", label: "Shop/Street License" }
];

