// Simple translation utility
export class Translator {
  static async translate(
    text: string,
    fromLang: string,
    toLang: string
  ): Promise<string> {
    try {
      const langMap: Record<string, string> = {
        ka: "ka-GE",
        ru: "ru-RU",
        en: "en-US",
      };
      const sourceLang = langMap[fromLang] || fromLang;
      const targetLang = langMap[toLang] || toLang;

      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLang}|${targetLang}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.responseStatus === 200) {
          return data.responseData.translatedText;
        }
      }
    } catch (error) {
      console.error("MyMemory translation failed:", error);
    }

    throw new Error("All translation methods failed");
  }
}
