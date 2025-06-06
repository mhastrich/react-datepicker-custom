import React, { Component, cloneElement } from "react";
import Calendar from "./calendar";
import CalendarIcon from "./calendar_icon";
import {
  registerLocale,
  setDefaultLocale,
  getDefaultLocale,
  type HighlightDate,
  type HolidayItem,
} from "./date_utils";
import PopperComponent from "./popper_component";
import Portal from "./portal";
import type { ClickOutsideHandler } from "./click_outside_wrapper";
export { default as CalendarContainer } from "./calendar_container";
export { registerLocale, setDefaultLocale, getDefaultLocale };
export { ReactDatePickerCustomHeaderProps } from "./calendar";
interface Holiday {
  date: string;
  holidayName: string;
}
type CalendarProps = React.ComponentPropsWithoutRef<typeof Calendar>;
interface CalendarIconProps
  extends React.ComponentPropsWithoutRef<typeof CalendarIcon> {}
interface PortalProps extends React.ComponentPropsWithoutRef<typeof Portal> {}
interface PopperComponentProps
  extends React.ComponentPropsWithoutRef<typeof PopperComponent> {}
type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
export type DatePickerProps = OmitUnion<
  CalendarProps,
  | "setOpen"
  | "dateFormat"
  | "preSelection"
  | "onSelect"
  | "onClickOutside"
  | "highlightDates"
  | "holidays"
  | "shouldFocusDayInline"
  | "outsideClickIgnoreClass"
  | "monthSelectedIn"
  | "onDropdownFocus"
  | "onTimeChange"
  | "className"
  | "container"
  | "handleOnKeyDown"
  | "handleOnDayKeyDown"
  | "isInputFocused"
  | "setPreSelection"
  | "selectsRange"
  | "selectsMultiple"
  | "dropdownMode"
> &
  Partial<Pick<CalendarIconProps, "icon">> &
  OmitUnion<PortalProps, "children" | "portalId"> &
  OmitUnion<
    PopperComponentProps,
    | "className"
    | "hidePopper"
    | "targetComponent"
    | "popperComponent"
    | "popperOnKeyDown"
    | "showArrow"
  > & {
    dateFormatCalendar?: CalendarProps["dateFormat"];
    calendarClassName?: CalendarProps["className"];
    calendarContainer?: CalendarProps["container"];
    dropdownMode?: CalendarProps["dropdownMode"];
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
    popperClassName?: PopperComponentProps["className"];
    showPopperArrow?: PopperComponentProps["showArrow"];
    open?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    startOpen?: boolean;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClickOutside?: ClickOutsideHandler;
    onInputClick?: VoidFunction;
    preventOpenOnFocus?: boolean;
    closeOnScroll?: boolean | ((event: Event) => boolean);
    isClearable?: boolean;
    clearButtonTitle?: string;
    clearButtonClassName?: string;
    ariaLabelClose?: string;
    className?: string;
    customInput?: Parameters<typeof cloneElement>[0];
    dateFormat?: string | string[];
    showDateSelect?: boolean;
    highlightDates?: (Date | HighlightDate)[];
    onCalendarOpen?: VoidFunction;
    onCalendarClose?: VoidFunction;
    strictParsing?: boolean;
    swapRange?: boolean;
    onInputError?: (error: { code: 1; msg: string }) => void;
    allowSameDay?: boolean;
    withPortal?: boolean;
    focusSelectedMonth?: boolean;
    showIcon?: boolean;
    calendarIconClassname?: never;
    calendarIconClassName?: string;
    toggleCalendarOnIconClick?: boolean;
    holidays?: Holiday[];
    startDate?: Date | null;
    endDate?: Date | null;
    selected?: Date | null;
    value?: string;
    customInputRef?: string;
    id?: string;
    name?: string;
    form?: string;
    autoFocus?: boolean;
    placeholderText?: string;
    autoComplete?: string;
    title?: string;
    required?: boolean;
    tabIndex?: number;
    ariaDescribedBy?: string;
    ariaInvalid?: string;
    ariaLabelledBy?: string;
    ariaRequired?: string;
    onChangeRaw?: (
      event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => void;
    onSelect?: (
      date: Date | null,
      event?:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLElement>,
    ) => void;
  } & (
    | {
        selectsRange?: never;
        selectsMultiple?: never;
        onChange?: (
          date: Date | null,
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
    | {
        selectsRange: true;
        selectsMultiple?: never;
        onChange?: (
          date: [Date | null, Date | null],
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
    | {
        selectsRange?: never;
        selectsMultiple: true;
        onChange?: (
          date: Date[] | null,
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
  );
interface DatePickerState {
  open: boolean;
  wasHidden: boolean;
  lastPreSelectChange?:
    | typeof PRESELECT_CHANGE_VIA_INPUT
    | typeof PRESELECT_CHANGE_VIA_NAVIGATE;
  inputValue: string | null;
  preventFocus: boolean;
  preSelection?: CalendarProps["preSelection"];
  shouldFocusDayInline?: CalendarProps["shouldFocusDayInline"];
  monthSelectedIn?: CalendarProps["monthSelectedIn"];
  focused?: CalendarProps["isInputFocused"];
  highlightDates: Required<CalendarProps>["highlightDates"];
  isRenderAriaLiveMessage?: boolean;
}
export default class DatePicker extends Component<
  DatePickerProps,
  DatePickerState
> {
  static get defaultProps(): {
    allowSameDay: boolean;
    dateFormat: string;
    dateFormatCalendar: string;
    disabled: boolean;
    disabledKeyboardNavigation: boolean;
    dropdownMode: "scroll";
    preventOpenOnFocus: boolean;
    monthsShown: number;
    readOnly: boolean;
    withPortal: boolean;
    selectsDisabledDaysInRange: boolean;
    shouldCloseOnSelect: boolean;
    showTimeSelect: boolean;
    showTimeInput: boolean;
    showPreviousMonths: boolean;
    showMonthYearPicker: boolean;
    showFullMonthYearPicker: boolean;
    showTwoColumnMonthYearPicker: boolean;
    showFourColumnMonthYearPicker: boolean;
    showYearPicker: boolean;
    showQuarterYearPicker: boolean;
    showWeekPicker: boolean;
    strictParsing: boolean;
    swapRange: boolean;
    timeIntervals: number;
    timeCaption: string;
    previousMonthAriaLabel: string;
    previousMonthButtonLabel: string;
    nextMonthAriaLabel: string;
    nextMonthButtonLabel: string;
    previousYearAriaLabel: string;
    previousYearButtonLabel: string;
    nextYearAriaLabel: string;
    nextYearButtonLabel: string;
    timeInputLabel: string;
    enableTabLoop: boolean;
    yearItemNumber: number;
    focusSelectedMonth: boolean;
    showPopperArrow: boolean;
    excludeScrollbar: boolean;
    customTimeInput: null;
    calendarStartDay: undefined;
    toggleCalendarOnIconClick: boolean;
    usePointerEvent: boolean;
  };
  constructor(props: DatePickerProps);
  componentDidMount(): void;
  componentDidUpdate(
    prevProps: DatePickerProps,
    prevState: DatePickerState,
  ): void;
  componentWillUnmount(): void;
  preventFocusTimeout: ReturnType<typeof setTimeout> | undefined;
  inputFocusTimeout: ReturnType<typeof setTimeout> | undefined;
  calendar: Calendar | null;
  input: HTMLElement | null;
  getPreSelection: () => Date;
  modifyHolidays: () => HolidayItem[] | undefined;
  calcInitialState: () => DatePickerState;
  resetHiddenStatus: () => void;
  setHiddenStatus: () => void;
  setHiddenStateOnVisibilityHidden: () => void;
  clearPreventFocusTimeout: () => void;
  setFocus: () => void;
  setBlur: () => void;
  deferBlur: () => void;
  setOpen: (open: boolean, skipSetBlur?: boolean) => void;
  inputOk: () => boolean;
  isCalendarOpen: () => boolean;
  handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
  sendFocusBackToInput: () => void;
  cancelFocusInput: () => void;
  deferFocusInput: () => void;
  handleDropdownFocus: () => void;
  handleBlur: (event: React.FocusEvent<HTMLElement>) => void;
  handleCalendarClickOutside: (event: MouseEvent) => void;
  handleChange: (
    ...allArgs: Parameters<Required<DatePickerProps>["onChangeRaw"]>
  ) => void;
  handleSelect: (
    date: Date,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    monthSelectedIn?: number,
  ) => void;
  setSelected: (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    keepInput?: boolean,
    monthSelectedIn?: number,
  ) => void;
  setPreSelection: (date?: Date | null) => void;
  toggleCalendar: () => void;
  handleTimeChange: (time: Date) => void;
  onInputClick: () => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  onPortalKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onDayKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onPopperKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClearClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  clear: () => void;
  onScroll: (event: Event) => void;
  renderCalendar: () => React.JSX.Element | null;
  renderAriaLiveRegion: () => React.JSX.Element;
  renderDateInput: () => React.FunctionComponentElement<any>;
  renderClearButton: () => React.ReactElement | null;
  renderInputContainer(): React.ReactElement;
  render(): React.ReactElement | null;
}
declare const PRESELECT_CHANGE_VIA_INPUT = "input";
declare const PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";
