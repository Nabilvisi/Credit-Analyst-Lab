/* All money in IDR billion. Rates are annual nominal, paid monthly. */
export const DEFAULTS = Object.freeze({units:5,assetPrice:6,hours:250,utilization:75,hourlyRate:1.85,fuelCost:0.36,otherVariable:0.26,fixedCost:0.12,taxRate:0.22,depreciation:0.25,maintenanceCapex:0.075,principal:21,annualRate:13,tenor:48,dso:45,recovery:55,pd:3});
export const PRESETS = {base:{},downside:{utilization:65,hourlyRate:1.7575,fuelCost:0.414,annualRate:16,dso:75,recovery:45,pd:7},severe:{utilization:50,hourlyRate:1.665,fuelCost:0.45,annualRate:18,dso:105,recovery:35,pd:15}};
export function payment(principal,annualRate,tenor){const r=annualRate/1200;return r===0?principal/tenor:principal*r/(1-Math.pow(1+r,-tenor));}
export function evaluate(input={}){
 const a={...DEFAULTS,...input};
 for(const [k,v] of Object.entries(a))if(!Number.isFinite(v))throw new Error(`Invalid ${k}`);
 if(a.principal<=0||a.tenor<=0||a.annualRate<0||a.utilization<0||a.utilization>100||a.hourlyRate<0||a.fuelCost<0||a.dso<0||a.recovery<0||a.recovery>100||a.pd<0||a.pd>100)throw new Error('Input outside model bounds');
 const billedHours=a.units*a.hours*a.utilization/100;
 const revenue=billedHours*a.hourlyRate/1000;
 const fuel=billedHours*a.fuelCost/1000;
 const other=billedHours*a.otherVariable/1000;
 const ebitda=revenue-fuel-other-a.fixedCost;
 const tax=Math.max(0,ebitda-a.depreciation)*a.taxRate;
 const cfads=ebitda-tax-a.maintenanceCapex;
 const debtService=payment(a.principal,a.annualRate,a.tenor);
 const dscr=cfads/debtService;
 // Incremental receivables compared with the same revenue at baseline DSO.
 const wcShock=revenue*Math.max(0,a.dso-DEFAULTS.dso)/30;
 const firstYearDscr=(cfads*12-wcShock)/(debtService*12);
 const assetValue=a.units*a.assetPrice;
 const grossRecovery=assetValue*a.recovery/100;
 const recoveryCost=grossRecovery*0.1;
 const netRecovery=Math.max(0,grossRecovery-recoveryCost);
 const loss=Math.max(0,a.principal-netRecovery);
 const lgd=loss/a.principal;
 const expectedLoss=a.pd/100*loss;
 const maxPrincipal=Math.max(0,cfads/1.1/payment(1,a.annualRate,a.tenor));
 const balanceSheetLiquidity=6.5; // Synthetic unrestricted cash; reserve excluded.
 const reserve=debtService*3;
 const liquidityHeadroom=balanceSheetLiquidity-reserve-wcShock;
 const schedule=[];let balance=a.principal;
 for(let month=1;month<=a.tenor;month++){
  const interest=balance*a.annualRate/1200;
  const paidPrincipal=Math.min(balance,debtService-interest);
  const closing=Math.max(0,balance-paidPrincipal);
  schedule.push({month,opening:balance,interest,principal:paidPrincipal,payment:paidPrincipal+interest,closing,cfads,dscr,cashAfterDebt:cfads-debtService-(month===1?wcShock:0)});balance=closing;
 }
 return {assumptions:a,billedHours,revenue,fuel,other,ebitda,tax,cfads,debtService,dscr,wcShock,firstYearDscr,grossRecovery,recoveryCost,netRecovery,loss,lgd,expectedLoss,maxPrincipal,reserve,liquidityHeadroom,ltv:a.principal/assetValue,schedule};
}
export function breakEvenUtilization(a={},target=1.25){let low=0,high=100;for(let i=0;i<60;i++){const mid=(low+high)/2;if(evaluate({...a,utilization:mid}).dscr<target)low=mid;else high=mid;}return high;}
export function sensitivity(principal=21){return [50,60,65,70,75,80,90].map(utilization=>({utilization,cells:[-10,-5,0,5,10].map(change=>({change,dscr:evaluate({principal,utilization,hourlyRate:DEFAULTS.hourlyRate*(1+change/100)}).dscr}))}));}
