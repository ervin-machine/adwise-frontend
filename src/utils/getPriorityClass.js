const getPriorityClass = (priority) => {
    switch (priority) {
      case "LOW":
        return "from-slate-50 to-green-300";
      case "MEDIUM":
        return "from-slate-50 to-orange-300";
      case "HIGH":
        return "from-slate-50 to-red-300";
      default:
        return "from-slate-50 to-gray-300";
    }
  };

export default getPriorityClass