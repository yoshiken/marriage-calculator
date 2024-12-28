"use client";


import React, { useState } from "react";
import { calculateMarriageRate, UserInputs } from "@/utils/calculateMarriageRate";

const initialInputs: UserInputs = {
  gender: "male",
  age: 30,
  education: "大学",
  income: 500,
  drinking: "飲まない",
  smoking: "吸わない",
  marriageHistory: "初婚",
  children: "なし",
  LivingTogetherMyFamliy: "こだわらない",
  LivingTogetherPartnerFamliy: "構わない",
};


const MarriageCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<UserInputs>(initialInputs);
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "age" || name === "income" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedRate = calculateMarriageRate(inputs);
    setResult(calculatedRate);
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 性別 */}
        <div>
          <label className="block font-semibold">性別</label>
          <select name="gender" value={inputs.gender} onChange={handleChange} className="border p-2 w-full">
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>

        {/* 年齢 */}
        <div>
          <label className="block font-semibold">年齢</label>
          <input
            type="number"
            name="age"
            value={inputs.age}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* 学歴 */}
        <div>
          <label className="block font-semibold">学歴</label>
          <select name="education" value={inputs.education} onChange={handleChange} className="border p-2 w-full">
            <option value="義務">義務</option>
            <option value="高校">高校</option>
            <option value="専門">専門</option>
            <option value="高専">高専</option>
            <option value="短大">短大</option>
            <option value="大学">大学</option>
            <option value="大学院">大学院卒</option>
            <option value="その他">その他</option>
          </select>
        </div>


        {/* 年収 */}
        <div>
          <label className="block font-semibold">年収（万円）</label>
          <input
            type="number"
            name="income"
            value={inputs.income}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>


        {/* 飲酒 */}
        <div>
          <label className="block font-semibold">飲酒</label>
          <select name="drinking" value={inputs.drinking} onChange={handleChange} className="border p-2 w-full">
            <option value="飲まない">飲まない</option>
            <option value="付き合い程度">付き合い程度</option>
            <option value="飲む">飲む</option>
          </select>
        </div>

        {/* 喫煙 */}
        <div>
          <label className="block font-semibold">喫煙</label>
          <select name="smoking" value={inputs.smoking} onChange={handleChange} className="border p-2 w-full">
            <option value="吸わない">吸わない</option>
            <option value="あまり吸わない">あまり吸わない</option>
            <option value="吸う">吸う</option>
          </select>
        </div>

        {/* 婚姻歴 */}
        <div>
          <label className="block font-semibold">婚姻歴</label>
          <select name="marriageHistory" value={inputs.marriageHistory} onChange={handleChange} className="border p-2 w-full">
            <option value="初婚">初婚</option>
            <option value="再婚">再婚</option>
            <option value="再々婚以上">再々婚以上</option>
          </select>
        </div>

        {/* 子どもの有無 */}
        <div>
          <label className="block font-semibold">子どもの有無</label>
          <select name="children" value={inputs.children} onChange={handleChange} className="border p-2 w-full">
            <option value="なし">なし</option>
            <option value="あり(同居)">あり(同居)</option>
            <option value="あり(別居)">あり(別居)</option>
          </select>
        </div>

        {/* 同居希望 */}
        <div>
          <label className="block font-semibold">自分の家族と同居希望</label>
          <select name="LivingTogetherMyFamliy" value={inputs.LivingTogetherMyFamliy} onChange={handleChange} className="border p-2 w-full">
            <option value="希望する">希望する</option>
            <option value="希望しない">希望しない</option>
            <option value="こだわらない">こだわらない</option>
          </select>
        </div>

        {/* 同居希望 */}
        <div>
          <label className="block font-semibold">相手の家族と同居希望</label>
          <select name="LivingTogetherMyFamliy" value={inputs.LivingTogetherPartnerFamliy} onChange={handleChange} className="border p-2 w-full">
            <option value="構わない">構わない</option>
            <option value="難しい">難しい</option>
            <option value="要相談">要相談</option>
          </select>
        </div>

        {/* ボタン */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          成婚率を計算する
        </button>
      </form>

      {result !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">成婚率: {result}%</h2>
        </div>
      )}
    </div>
  );
};

export default MarriageCalculator;
