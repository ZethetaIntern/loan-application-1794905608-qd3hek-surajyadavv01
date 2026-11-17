// Reducing-balance EMI: P × R × (1+R)^N / ((1+R)^N − 1). Illustrative only.
export function calcEmi(principal, annualRatePct, months) {
  const P = Number(principal), N = Number(months), rate = Number(annualRatePct);
  if (!(P > 0) || !(N > 0) || !(rate >= 0)) return null;
  const R = rate / 12 / 100;
  const emi = R === 0 ? P / N : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  const total = emi * N;
  return { emi, total, interest: total - P };
}
