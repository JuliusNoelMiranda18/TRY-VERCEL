import { ChildAnalytics } from "@/lib/constants/analytics";

interface AnalyticsCardProps {
  data: ChildAnalytics;
}

export function AnalyticsCard({ data }: AnalyticsCardProps) {
  return (
    <div className="aralkada-card p-4 flex flex-col gap-3">
      {/* Header with Child Profile Pill */}
      <div className="flex items-center justify-between border-b border-[#4A3B2C]/15 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#162660] text-[#F1E4D1] font-black text-base flex items-center justify-center border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C]">
            {data.avatarLetter}
          </div>
          <div>
            <h3 className="font-black text-base text-[#162660] leading-none">
              {data.childName}&apos;s Growth Analytics
            </h3>
            <span className="text-[10px] font-bold text-[#162660]/70 uppercase tracking-wider">
              Connected Profile
            </span>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-[#D0E6FD] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] text-[9px] font-black text-[#162660] uppercase tracking-wider">
          Live Tracking
        </div>
      </div>

      {/* Metrics Section */}
      <div className="flex flex-col gap-2">
        {/* Actions Box */}
        <div className="rounded-2xl border-2 border-[#4A3B2C] bg-[#F8F1E5] p-3 shadow-[0_3px_0_#4A3B2C]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-[11px] text-[#162660] uppercase tracking-wider">
              Offline Actions
            </span>
            <span className="text-[11px] font-extrabold text-[#162660]/60">
              Total: {data.actions.ongoing + data.actions.done}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/30 p-2 text-center">
              <span className="block text-[10px] font-bold text-[#162660]/70 uppercase">Ongoing</span>
              <span className="text-xl font-black text-[#162660]">{data.actions.ongoing}</span>
            </div>
            <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/30 p-2 text-center">
              <span className="block text-[10px] font-bold text-[#162660]/70 uppercase">Done</span>
              <span className="text-xl font-black text-[#162660]">{data.actions.done}</span>
            </div>
          </div>
        </div>

        {/* Challenges Box */}
        <div className="rounded-2xl border-2 border-[#4A3B2C] bg-[#F8F1E5] p-3 shadow-[0_3px_0_#4A3B2C]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-[11px] text-[#162660] uppercase tracking-wider">
              Challenges
            </span>
            <span className="text-[11px] font-extrabold text-[#162660]/60">
              Total: {data.challenges.ongoing + data.challenges.done}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/30 p-2 text-center">
              <span className="block text-[10px] font-bold text-[#162660]/70 uppercase">Ongoing</span>
              <span className="text-xl font-black text-[#162660]">{data.challenges.ongoing}</span>
            </div>
            <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/30 p-2 text-center">
              <span className="block text-[10px] font-bold text-[#162660]/70 uppercase">Done</span>
              <span className="text-xl font-black text-[#162660]">{data.challenges.done}</span>
            </div>
          </div>
        </div>

        {/* Tokens & Earned Screen Time Box */}
        <div className="rounded-2xl border-2 border-[#4A3B2C] bg-[#D0E6FD] p-3 shadow-[0_3px_0_#4A3B2C]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-[11px] text-[#162660] uppercase tracking-wider">
              Tokens &amp; Screen Time Earned
            </span>
            <span className="text-[11px] font-extrabold text-[#162660]/70">
              {data.tokens.totalTokens} Tokens
            </span>
          </div>

          <div className="rounded-xl bg-white border-2 border-[#4A3B2C] p-3 flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-black text-[#162660] uppercase">
                Earned Screen Time:
              </span>
              <span className="text-xl font-black text-[#162660]">
                {data.tokens.earnedHours} hrs
              </span>
            </div>

            <div className="w-full bg-[#F1E4D1] h-2.5 rounded-full overflow-hidden border border-[#4A3B2C]/30">
              <div
                className="bg-[#162660] h-full rounded-full transition-all"
                style={{
                  width: `${(data.tokens.usedHours / data.tokens.earnedHours) * 100}%`,
                }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-extrabold text-[#162660]/75">
              <span>Used: {data.tokens.usedHours} hrs</span>
              <span>Available: {data.tokens.remainingHours} hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
