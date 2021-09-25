import { Meta, Story } from "@storybook/react";
import {
  ArrowRightIcon,
  CalendarIcon,
  CaretRightIcon,
  CheckCircleFilledIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClockIcon,
  DollarIcon,
  DownloadIcon,
  ExclamationCircleFilledIcon,
  EyeIcon,
  EyeSlashIcon,
  FolderOpenIcon,
  InfoCircleFilledIcon,
  MinusCircleFilledIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PercentIcon,
  PlusIcon,
  ResetIcon,
  SearchIcon,
  SpinnerIcon,
  TimesCircleFilledIcon,
  TimesIcon,
  UploadIcon,
} from "./src";
import { Icon, IconProps } from "./Icon";
import { colors } from "../../system/typings";

export default {
  title: "General/Icon",
  component: Icon,
} as Meta;

export const Playground: Story<IconProps> = (props) => (
  <Icon {...props} icon={TimesIcon} />
);

Playground.args = {
  icon: PlusIcon,
  spin: false,
};
Playground.argTypes = {
  color: {
    description: "因應 Design System Palette 會賦予文字的顏色們",
    type: "string",
    table: {
      type: {
        summary: colors.map((c) => c),
        defaultValue: {
          summary: "black",
        },
      },
    },
    control: {
      type: "select",
      options: colors,
    },
  },
  icon: {
    description: "欲 Render Icon 的 SVG 值",
    table: {
      type: {
        summary: "IconDefinition",
      },
    },
  },
  spin: {
    description: "讓 Icon 旋轉的 Boolean",
    type: "boolean",
    control: "boolean",
  },
};

interface AllStoryArgs {
  search: string;
}

export const All: Story<AllStoryArgs> = ({ search }) => {
  const icons = [
    ArrowRightIcon,
    CalendarIcon,
    CaretRightIcon,
    CheckIcon,
    CheckCircleFilledIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    DollarIcon,
    DownloadIcon,
    ExclamationCircleFilledIcon,
    EyeIcon,
    EyeSlashIcon,
    FolderOpenIcon,
    InfoCircleFilledIcon,
    MinusCircleFilledIcon,
    MoreHorizontalIcon,
    MoreVerticalIcon,
    PercentIcon,
    PlusIcon,
    ResetIcon,
    SearchIcon,
    SpinnerIcon,
    TimesIcon,
    TimesCircleFilledIcon,
    UploadIcon,
  ].filter((icon) => !search || icon.name.includes(search));

  return (
    <div
      className="grid grid-cols-4 gap-4 text-5xl text-center"
    >
      {icons.map((icon) => (
        <div key={icon.name}>
          <Icon icon={icon} />
          <div style={{ fontSize: 20 }}>{icon.name}</div>
        </div>
      ))}
    </div>
  );
};

All.args = {
  search: "",
};

export const Colors = () => (
  <div
    className="text-5xl"
  >
    {colors.map((color) => (
      <Icon key={color} icon={CheckIcon} color={color} />
    ))}
  </div>
);
