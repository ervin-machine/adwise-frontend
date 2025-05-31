const getWidthClass = (percentage) => {
    switch (percentage) {
      case "0%": return "w-0";
      case "5%": return "w-1/20";
      case "10%": return "w-1/10";
      case "15%": return "w-3/20";
      case "20%": return "w-1/5";
      case "25%": return "w-1/4";
      case "30%": return "w-3/10";
      case "35%": return "w-7/20";
      case "40%": return "w-2/5";
      case "45%": return "w-9/20";
      case "50%": return "w-1/2";
      case "55%": return "w-11/20";
      case "60%": return "w-3/5";
      case "65%": return "w-13/20";
      case "70%": return "w-7/10";
      case "75%": return "w-3/4";
      case "80%": return "w-4/5";
      case "85%": return "w-17/20";
      case "90%": return "w-9/10";
      case "95%": return "w-19/20";
      case "100%": return "w-full";
      default: return "w-0";
    }
  };

export default getWidthClass;