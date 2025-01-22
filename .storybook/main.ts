import type {StorybookConfig} from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "@storybook/addon-docs", // Docs 탭 활성화
        "@storybook/addon-links", // 컴포넌트 간 링크 지원
        "@storybook/addon-a11y", // 접근성 검사 애드온
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    staticDirs: ["../public"], // 정적 파일 디렉토리 추가
    docs: {
        autodocs: "tag", // 자동 문서화 활성화
    },
    webpackFinal: async config => {
        // Tailwind CSS 로더 추가
        config.module?.rules?.push({
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"],
            include: /src/,
        });
        return config;
    },
};
export default config;
