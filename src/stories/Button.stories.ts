import type {Meta, StoryObj} from "@storybook/react";
import {Button} from "@/app/components/ui/Button";

const meta: Meta<typeof Button> = {
    title: "Example/Button", // 스토리북 UI에서 표시될 이름
    component: Button,
    parameters: {
        layout: "centered", // 컴포넌트를 중앙에 배치
        docs: {
            source: {
                type: "auto", // 자동으로 렌더링된 HTML 코드를 생성
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            options: ["green", "black", "outline"], // 선택 가능한 옵션
        },
        size: {
            control: "radio", // 라디오 버튼으로 선택 가능
            options: ["default", "full", "small"], // 선택 가능한 옵션
        },
        type: {
            control: "radio", // 라디오 버튼으로 선택 가능
            options: ["button", "submit"], // 선택 가능한 옵션
        },
        className: {control: "text"},
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {
    args: {
        variant: "green",
        size: "default",
        type: "button",
        children: "Button",
    },
};

export const Black: Story = {
    args: {
        variant: "black",
        size: "full",
        type: "button",
        children: "Button",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        size: "small",
        type: "button",
        children: "Button",
    },
};
