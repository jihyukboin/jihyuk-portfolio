import { expect, test } from "@playwright/test";

const repositoryUrl = "https://github.com/jihyukboin/super-docs";

test.describe("Super Docs 서버 렌더링과 검색 정보", () => {
  test.use({ javaScriptEnabled: false });

  test("앱 소개, 지원 형식, FAQ와 구조화 데이터를 JavaScript 없이 제공한다", async ({
    page,
    request,
  }) => {
    await page.goto("/super-docs");
    await expect(page).toHaveTitle(
      "Super Docs - Mac용 무료 HWP·HWPX·DOCX 문서 편집기",
    );
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Super Docs",
    );
    await expect(page.locator("main")).toContainText("macOS 14 이상");
    await expect(page.getByRole("table")).toContainText("HWP 또는 HWPX");
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#111111",
    );
    await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
      "content",
      "dark",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/super-docs$/,
    );
    await expect(
      page.getByRole("link", { name: "Mac용 무료 다운로드" }).first(),
    ).toHaveAttribute("href", `${repositoryUrl}/releases/latest`);
    const schema = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    const app = schema["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "SoftwareApplication",
    );
    expect(app.name).toBe("Super Docs");
    expect(app.downloadUrl).toBe(`${repositoryUrl}/releases/latest`);
    expect(app.offers.price).toBe("0");
    const faq = schema["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "FAQPage",
    );
    const visibleQuestions = await page
      .locator("#faq summary")
      .allTextContents();
    expect(faq.mainEntity.map((item: { name: string }) => item.name)).toEqual(
      visibleQuestions.map((text) => text.replace(/\+$/, "").trim()),
    );
    const firstQuestion = page.locator("#faq details").first();
    await firstQuestion.locator("summary").click();
    await expect(firstQuestion.locator("p")).toBeVisible();
    expect(await (await request.get("/sitemap.xml")).text()).toContain(
      "/super-docs</loc>",
    );
    expect(await (await request.get("/llms.txt")).text()).toContain(
      repositoryUrl,
    );
  });
});

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`Super Docs ${colorScheme} 시스템 테마`, () => {
    test.use({ colorScheme, viewport: { width: 390, height: 844 } });

    test("어두운 테마를 유지하며 형식 탭과 모바일 메뉴가 동작한다", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/super-docs");
      await expect(page.locator("main").locator("..")).toHaveCSS(
        "background-color",
        "rgb(17, 17, 17)",
      );
      await expect(
        page.getByRole("button", { name: /theme|테마/i }),
      ).toHaveCount(0);
      await page.getByRole("tab", { name: "DOCX", exact: true }).click();
      await expect(page.getByRole("tabpanel")).toHaveCount(1);
      await expect(page.getByRole("tabpanel")).toContainText("Word 문서");
      await page.getByRole("tab", { name: "DOCX", exact: true }).press("Home");
      await expect(
        page.getByRole("tab", { name: "HWP", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await page.getByRole("button", { name: "메뉴 열기" }).click();
      const mobileMenu = page.getByRole("navigation", {
        name: "Super Docs 모바일 메뉴",
      });
      await expect(mobileMenu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(mobileMenu).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "메뉴 열기" }),
      ).toBeFocused();
      await page.getByRole("button", { name: "메뉴 열기" }).click();
      await mobileMenu.getByRole("link", { name: "지원 형식" }).click();
      await expect(page).toHaveURL(/#formats$/);
      await expect(mobileMenu).not.toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      expect(errors).toEqual([]);
    });
  });
}
