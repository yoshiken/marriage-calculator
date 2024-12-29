export interface UserInputs {
  gender: "male" | "female";
  age: number;
  education: string;
  income: number;
  drinking: string;
  smoking: string;
  marriageHistory: string;
  children: string;
  LivingTogetherMyFamily: string;
  LivingTogetherPartnerFamily: string;
}

export function calculateMarriageRate(inputs: UserInputs): number {
  let score = 100;
  const age = inputs.age;
  const gender = inputs.gender;

  // 学歴スコア
  score = calculateEducationScore(age, gender, inputs.education, score);
  console.log("学歴スコア", score);

  // 年収スコア
  score = calculateIncomeScore(age, gender, inputs.income, score);
  console.log("年収スコア", score);

  // 飲酒スコア
  score = calculateDrinkScore(gender, inputs.drinking, score);
  console.log("飲酒スコア", score);

  // 喫煙スコア
  score = calculateSmokeScore(gender, inputs.smoking, score);
  console.log("喫煙スコア", score);

  // 婚姻歴スコア
  score = calculateMarriageHistoryScore(gender, inputs.marriageHistory, score);
  console.log("婚姻歴スコア", score);

  // 子どもの有無スコア
  score = calculateChildrenScore(gender, inputs.children, score);
  console.log("子どもの有無スコア", score);

  // 自分家族との同居希望スコア
  score = calculateLivingTogetherByMyFamilyScore(gender, inputs.LivingTogetherMyFamily, score);
  console.log("自分家族との同居希望スコア", score);

  // 相手家族との同居希望スコア
  score = calculateLivingTogetherByPartnerFamilyScore(gender, inputs.LivingTogetherPartnerFamily, score);
  console.log("相手家族との同居希望スコア", score);


  // 小数点1桁
  return Math.round(score * 10) / 10;
};


function calculateEducationScore(age:number, gender:string, education: string, score:number): number {
  let resultList: number[] = [];
  if (gender === "male") {
    switch (education) {
      case "義務":
        resultList = [0.0, 0.0, 39.1, 88.8, 31.3, 18.6, 18.2, 53.9, 54.1];
        break;
      case "高校":
        resultList = [46.0, 75.8, 84.9, 72.4, 59.6, 57.3, 31.9, 148.9, 141.1];
        break;
      case "専門":
        resultList = [0.0, 107.4, 90.6, 72.6, 58.0, 62.0, 33.5, 253.0, 364.9];
        break;
      case "高専":
        resultList = [0.0, 140.7, 88.8, 72.2, 43.4, 66.2, 78.2, 312.7, 373.2];
        break;
      case "短大":
        resultList = [0.0, 26.1, 78.2, 70.6, 55.8, 22.7, 175.9, 171.6, 74.1];
        break;
      case "大学":
        resultList = [106.6, 113.9, 117.6, 97.2, 74.5, 68.3, 209.5, 236.3, 99.6];
        break;
      case "大学院":
        resultList = [169.5, 148.5, 122.1, 104.9, 105.3, 52.2, 400.3, 540.6, 136.9];
        break;
      case "その他":
        resultList = [0.0, 60.1, 73.3, 93.1, 88.8, 27.9, 167.5, 97.7, 87.7];
        break;
    }
  }


  if (gender === "female") {
    switch (education) {
      case "義務":
        resultList = [0.0, 0.0, 325.7, 76.0, 114.0, 101.3, 0.0, 0.0, 26.8];
        break;
      case "高校":
        resultList = [171.0, 183.3, 162.8, 106.3, 108.4, 72.3, 65.1, 66.0, 39.9];
        break;
      case "専門":
        resultList = [188.7, 162.3, 164.0, 108.5, 100.0, 68.1, 69.7, 70.8, 61.8];
        break;
      case "高専":
        resultList = [0.0, 47.2, 84.0, 87.7, 51.8, 87.7, 182.4, 57.0, 0.0];
        break;
      case "短大":
        resultList = [0.0, 174.2, 121.2, 73.4, 73.9, 44.9, 54.1, 37.6, 82.4];
        break;
      case "大学":
        resultList = [139.3, 158.8, 131.2, 91.5, 71.3, 58.0, 41.6, 47.9, 100.4];
        break;
      case "大学院":
        resultList = [154.2, 130.9, 99.5, 87.3, 73.5, 74.0, 127.7, 19.0, 105.4];
        break;
      case "その他":
        resultList = [0.0, 182.4, 97.7, 114.0, 50.7, 76.0, 0.0, 91.2, 82.9];
        break;
    }
  }

  let resultListIndex: number = 0;

  switch (true) {
    case age <= 19:
      return 0;
    case age >= 20 && age <= 24:
      resultListIndex = 0;
      break;
    case age >= 25 && age <= 29:
      resultListIndex = 1;
      break;
    case age >= 30 && age <= 34:
      resultListIndex = 2;
      break;
    case age >= 35 && age <= 39:
      resultListIndex = 3;
      break;
    case age >= 40 && age <= 44:
      resultListIndex = 4;
      break;
    case age >= 45 && age <= 49:
      resultListIndex = 5;
      break;
    case age >= 50 && age <= 54:
      resultListIndex = 6;
      break;
    case age >= 55 && age <= 59:
      resultListIndex = 7;
      break;
    case age >= 60:
      resultListIndex = 8;
      break;
  }

  return score * (resultList[resultListIndex] * 0.01);
}


function calculateIncomeScore(age: number, gender: string, income: number, score: number): number {
  let resultList: number[] = [];

  if (gender === "male") {
    switch (true) {
      case income <= 299:
        resultList = [195.3, 32.6, 24.9, 32.2, 31.6, 12.9, 0.0, 31.3, 31.3, 26.8];
        break;
      case income >= 300 && income <= 399:
        resultList = [43.4, 67.0, 69.8, 45.0, 33.0, 27.6, 18.1, 81.4, 60.4, 48.7];
        break;
      case income >= 400 && income <= 499:
        resultList = [44.6, 125.8, 96.7, 76.1, 45.8, 39.5, 19.5, 175.5, 134.0, 74.9];
        break;
      case income >= 500 && income <= 599:
        resultList = [78.1, 142.2, 148.0, 98.5, 65.1, 57.1, 24.5, 190.8, 250.2, 99.4];
        break;
      case income >= 600 && income <= 699:
        resultList = [195.3, 140.5, 145.9, 113.8, 85.9, 77.9, 27.9, 205.8, 414.0, 111.2];
        break;
      case income >= 700 && income <= 799:
        resultList = [0.0, 169.3, 137.7, 112.8, 98.2, 88.2, 42.3, 240.4, 441.5, 123.3];
        break;
      case income >= 800 && income <= 899:
        resultList = [0.0, 125.6, 132.0, 115.7, 67.5, 49.0, 19.0, 190.6, 375.4, 121.1];
        break;
      case income >= 900 && income <= 999:
        resultList = [0.0, 48.8, 141.8, 121.8, 87.9, 115.3, 57.7, 298.0, 615.0, 140.4];
        break;
      case income >= 1000 && income <= 1499:
        resultList = [0.0, 130.2, 141.7, 126.0, 115.2, 123.5, 71.2, 346.4, 552.9, 163.0];
        break;
      case income >= 1500 && income <= 1999:
        resultList = [0.0, 195.3, 116.2, 189.4, 120.4, 129.1, 54.8, 327.7, 364.2, 164.2];
        break;
      case income >= 2000:
        resultList = [0.0, 390.7, 78.1, 131.8, 87.7, 96.4, 52.1, 201.3, 247.0, 123.3];
        break;
    }
  }

  if (gender === "female") {
    return score; // 女性の場合開示されていないため、スコアをそのまま返す
  }

  let resultListIndex: number = 0;

  switch (true) {
    case age <= 19:
      return 0;
    case age >= 20 && age <= 24:
      resultListIndex = 0;
      break;
    case age >= 25 && age <= 29:
      resultListIndex = 1;
      break;
    case age >= 30 && age <= 34:
      resultListIndex = 2;
      break;
    case age >= 35 && age <= 39:
      resultListIndex = 3;
      break;
    case age >= 40 && age <= 44:
      resultListIndex = 4;
      break;
    case age >= 45 && age <= 49:
      resultListIndex = 5;
      break;
    case age >= 50 && age <= 54:
      resultListIndex = 6;
      break;
    case age >= 55 && age <= 59:
      resultListIndex = 7;
      break;
    case age >= 60:
      resultListIndex = 8;
      break;
  }

  return score * (resultList[resultListIndex] * 0.01);
}


function calculateDrinkScore(gender: string, drinking: string, score: number): number {

  let ratio: number = 100;

  if (gender === "male") {
    switch (drinking) {
      case "飲まない":
        ratio = 74.8;
        break;
      case "付き合い程度":
        ratio = 98.3;
        break;
      case "飲む":
        ratio = 123;
        break;
    }
  }
  if (gender === "female") {
    switch (drinking) {
      case "飲まない":
        ratio = 91.8;
        break;
      case "付き合い程度":
        ratio = 99.7;
        break;
      case "飲む":
        ratio = 118.5;
        break;
    }
  }

  return score * (ratio * 0.01);
}

function calculateSmokeScore(gender:string, smoking:string, score:number): number {
  let ratio: number = 100;

  if (gender === "male") {
    switch (smoking) {
      case "吸わない":
       ratio = 103.5;
       break;
      case "あまり吸わない":
       ratio = 72;
       break;
      case "吸う":
       ratio = 67.6;
       break;
    }
  }
  if (gender === "female") {
    switch (smoking) {
      case "吸わない":
       ratio = 100.4;
       break;
      case "あまり吸わない":
       ratio = 51.5;
       break;
      case "吸う":
       ratio = 74.8;
       break;
    }
  }
  return score * (ratio * 0.01);
}

function calculateMarriageHistoryScore(gender:string, marriageHistory:string, score:number): number {
  let ratio: number = 100;

  if (gender === "male") {
    switch (marriageHistory) {
      case "初婚":
        ratio = 98;
        break;
      case "再婚":
        ratio = 117.1;
        break;
      case "再々婚以上":
        ratio = 61.5;
        break;
    }
  }

  if (gender === "female") {
    switch (marriageHistory) {
      case "初婚":
        ratio = 99.4;
        break;
      case "再婚":
        ratio = 107.5;
        break;
      case "再々婚以上":
        ratio = 73.5;
        break;
    }
  }
  return score * (ratio * 0.01);
}

function calculateChildrenScore(gender:string, children:string, score:number): number {
  let ratio: number = 100;

  if (gender === "male") {
    switch (children) {
      case "あり(同居)":
        ratio = 135.6;
        break;
      case "あり(別居)":
        ratio = 95.4;
        break;
      case "なし":
        ratio = 100;
        break;
    }
  }

  if (gender === "female") {
    switch (children) {
      case "あり(同居)":
        ratio = 89.2;
        break;
      case "あり(別居)":
        ratio = 48.1;
        break;
      case "なし":
        ratio = 102.8;
        break;
    }
  }

  return score * (ratio * 0.01);
}

function calculateLivingTogetherByMyFamilyScore(gender:string, coResidence:string, score:number): number {
  let ratio: number = 100;

  if (gender === "male") {
    switch (coResidence) {
      case "希望する":
        ratio = 40.8;
        break;
      case "希望しない":
        ratio = 107.6;
        break;
      case "こだわらない":
        ratio = 90.5;
        break;
    }
  }

  if (gender === "female") {
    switch (coResidence) {
      case "希望する":
        ratio = 82.2;
        break;
      case "希望しない":
        ratio = 101.5;
        break;
      case "こだわらない":
        ratio = 96.5;
        break;
    }
  }

  return score * (ratio * 0.01);
}

function calculateLivingTogetherByPartnerFamilyScore(gender:string, coResidence:string, score:number): number {
  let ratio: number = 100;

  if (gender === "male") {
    switch (coResidence) {
      case "構わない":
        ratio = 119.1;
        break;
      case "難しい":
        ratio = 90;
        break;
      case "要相談":
        ratio = 107.9;
        break;
    }
  }

  if (gender === "female") {
    switch (coResidence) {
      case "構わない":
        ratio = 110.5;
        break;
      case "難しい":
        ratio = 99.3;
        break;
      case "要相談":
        ratio = 100.5;
        break;
    }
  }

  return score * (ratio * 0.01);
}
