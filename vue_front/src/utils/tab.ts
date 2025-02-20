
const tabNames: { [key: number]: string[] } = {
    6: ["რეგიონი", "მუნიციპალიტეტი", "სექტორი", "ლოკალური", "აღმწერი"],
    5: ["მუნიციპალიტეტი", "სექტორი", "ლოკალური", "აღმწერი"],
    4: ["სექტორი", "ლოკალური", "აღმწერი"],
    3: ["ლოკალური", "აღმწერი"],
    2: ["აღმწერი"],
};
  
export const getTabName = (index: number, categoryId: number): any => {
    if (categoryId !== undefined) {
      const names = tabNames[categoryId];
      return names[index];
    }
    return [];
  };