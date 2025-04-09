/*!
  react-datepicker v8.3.0
  https://github.com/Hacker0x01/react-datepicker
  Released under the MIT License.
*/
import { clsx } from "clsx";
import React, {
  useRef,
  useCallback,
  useEffect,
  cloneElement,
  Component,
  createRef,
  createElement,
} from "react";
import {
  isSameDay as isSameDay$1,
  isWithinInterval,
  startOfWeek,
  format,
  startOfDay,
  endOfDay,
  isEqual as isEqual$1,
  parseISO,
  toDate,
  differenceInCalendarDays,
  isValid as isValid$1,
  isBefore,
  getISOWeek,
  isSameMonth as isSameMonth$1,
  isSameQuarter as isSameQuarter$1,
  getYear,
  getMonth,
  getQuarter,
  startOfMonth,
  startOfQuarter,
  endOfMonth,
  setMonth,
  setQuarter,
  isSameYear as isSameYear$1,
  setHours,
  getHours,
  setMinutes,
  getMinutes,
  setSeconds,
  getSeconds,
  addHours,
  addMinutes,
  addSeconds,
  isAfter,
  startOfYear,
  endOfYear,
  min,
  max,
  subMonths,
  differenceInCalendarMonths,
  subQuarters,
  differenceInCalendarQuarters,
  subYears,
  differenceInCalendarYears,
  addMonths,
  addQuarters,
  addYears,
  isDate,
  parse,
  endOfWeek,
  getDay,
  getDate,
  addDays,
  addWeeks,
  getTime,
  setYear,
  differenceInDays,
  subWeeks,
  subDays,
} from "date-fns";
import {
  useFloating,
  autoUpdate,
  flip,
  offset,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";
import ReactDOM from "react-dom";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var _extendStatics = function extendStatics(d, b) {
  _extendStatics =
    Object.setPrototypeOf ||
    ({
      __proto__: [],
    } instanceof Array &&
      function (d, b) {
        d.__proto__ = b;
      }) ||
    function (d, b) {
      for (var p in b)
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError(
      "Class extends value " + String(b) + " is not a constructor or null",
    );
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}
var _assign = function __assign() {
  _assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return _assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function"
  ? SuppressedError
  : function (error, suppressed, message) {
      var e = new Error(message);
      return (
        (e.name = "SuppressedError"),
        (e.error = error),
        (e.suppressed = suppressed),
        e
      );
    };

var CalendarContainer = function (_a) {
  var _b = _a.showTimeSelectOnly,
    showTimeSelectOnly = _b === void 0 ? false : _b,
    _c = _a.showTime,
    showTime = _c === void 0 ? false : _c,
    className = _a.className,
    children = _a.children;
  var ariaLabel = showTimeSelectOnly
    ? "Choose Time"
    : "Choose Date".concat(showTime ? " and Time" : "");
  return React.createElement(
    "div",
    {
      className: className,
      role: "dialog",
      "aria-label": ariaLabel,
      "aria-modal": "true",
    },
    children,
  );
};

var useDetectClickOutside = function (onClickOutside, ignoreClass) {
  var ref = useRef(null);
  var onClickOutsideRef = useRef(onClickOutside);
  onClickOutsideRef.current = onClickOutside;
  var handleClickOutside = useCallback(
    function (event) {
      var _a;
      var target =
        (event.composed &&
          event.composedPath &&
          event.composedPath().find(function (eventTarget) {
            return eventTarget instanceof Node;
          })) ||
        event.target;
      if (ref.current && !ref.current.contains(target)) {
        if (
          !(
            ignoreClass &&
            target instanceof HTMLElement &&
            target.classList.contains(ignoreClass)
          )
        ) {
          (_a = onClickOutsideRef.current) === null || _a === void 0
            ? void 0
            : _a.call(onClickOutsideRef, event);
        }
      }
    },
    [ignoreClass],
  );
  useEffect(
    function () {
      document.addEventListener("mousedown", handleClickOutside);
      return function () {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [handleClickOutside],
  );
  return ref;
};
var ClickOutsideWrapper = function (_a) {
  var children = _a.children,
    onClickOutside = _a.onClickOutside,
    className = _a.className,
    containerRef = _a.containerRef,
    style = _a.style,
    ignoreClass = _a.ignoreClass;
  var detectRef = useDetectClickOutside(onClickOutside, ignoreClass);
  return React.createElement(
    "div",
    {
      className: className,
      style: style,
      ref: function (node) {
        detectRef.current = node;
        if (containerRef) {
          containerRef.current = node;
        }
      },
    },
    children,
  );
};

var KeyType;
(function (KeyType) {
  KeyType["ArrowUp"] = "ArrowUp";
  KeyType["ArrowDown"] = "ArrowDown";
  KeyType["ArrowLeft"] = "ArrowLeft";
  KeyType["ArrowRight"] = "ArrowRight";
  KeyType["PageUp"] = "PageUp";
  KeyType["PageDown"] = "PageDown";
  KeyType["Home"] = "Home";
  KeyType["End"] = "End";
  KeyType["Enter"] = "Enter";
  KeyType["Space"] = " ";
  KeyType["Tab"] = "Tab";
  KeyType["Escape"] = "Escape";
  KeyType["Backspace"] = "Backspace";
  KeyType["X"] = "x";
})(KeyType || (KeyType = {}));
function getLocaleScope() {
  // Use this cast to avoid messing with users globalThis (like window) and the rest of keys in the globalThis object we don't care about
  var scope = typeof window !== "undefined" ? window : globalThis;
  return scope;
}
var DEFAULT_YEAR_ITEM_NUMBER = 12;
// ** Date Constructors **
function newDate(value) {
  if (value == null) {
    return new Date();
  }
  var d = typeof value === "string" ? parseISO(value) : toDate(value);
  return isValid(d) ? d : new Date();
}
/**
 * Parses a date.
 *
 * @param value - The string representing the Date in a parsable form, e.g., ISO 1861
 * @param dateFormat - The date format.
 * @param locale - The locale.
 * @param strictParsing - The strict parsing flag.
 * @param refDate - The base date to be passed to date-fns parse() function.
 * @returns - The parsed date or null.
 */
function parseDate(value, dateFormat, locale, strictParsing, refDate) {
  if (refDate === void 0) {
    refDate = newDate();
  }
  var localeObject =
    getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
  var formats = Array.isArray(dateFormat) ? dateFormat : [dateFormat];
  for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
    var format_1 = formats_1[_i];
    var parsedDate = parse(value, format_1, refDate, {
      locale: localeObject,
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });
    if (
      isValid(parsedDate) &&
      (!strictParsing || value === formatDate(parsedDate, format_1, locale))
    ) {
      return parsedDate;
    }
  }
  return null;
}
/**
 * Checks if a given date is valid and not before the minimum date.
 * @param date - The date to be checked.
 * @param minDate - The minimum date allowed. If not provided, defaults to "1/1/1800".
 * @returns A boolean value indicating whether the date is valid and not before the minimum date.
 */
function isValid(date, minDate) {
  /* the fallback date is essential to not break test case
   * `should auto update calendar when the updated date text is after props.minDate`
   * and backward compatibility respectfully
   */
  return isValid$1(date) && !isBefore(date, new Date("1/1/1800"));
}
// ** Date Formatting **
/**
 * Formats a date.
 *
 * @param date - The date.
 * @param formatStr - The format string.
 * @param locale - The locale.
 * @returns - The formatted date.
 */
function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format(date, formatStr, {
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });
  }
  var localeObj = locale ? getLocaleObject(locale) : undefined;
  if (locale && !localeObj) {
    console.warn(
      'A locale object was not found for the provided string ["'.concat(
        locale,
        '"].',
      ),
    );
  }
  localeObj = localeObj || getLocaleObject(getDefaultLocale());
  return format(date, formatStr, {
    locale: localeObj,
    useAdditionalWeekYearTokens: true,
    useAdditionalDayOfYearTokens: true,
  });
}
/**
 * Safely formats a date.
 *
 * @param date - The date.
 * @param options - An object containing the dateFormat and locale.
 * @returns - The formatted date or an empty string.
 */
function safeDateFormat(date, _a) {
  var dateFormat = _a.dateFormat,
    locale = _a.locale;
  var formatStr =
    Array.isArray(dateFormat) && dateFormat.length > 0
      ? dateFormat[0]
      : dateFormat; // Cast to string because it's impossible to get `string | string[] | undefined` here and typescript doesn't know that
  return (date && formatDate(date, formatStr, locale)) || "";
}
/**
 * Safely formats a date range.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @param props - The props.
 * @returns - The formatted date range or an empty string.
 */
function safeDateRangeFormat(startDate, endDate, props) {
  if (!startDate) {
    return "";
  }
  var formattedStartDate = safeDateFormat(startDate, props);
  var formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";
  return "".concat(formattedStartDate, " - ").concat(formattedEndDate);
}
/**
 * Safely formats multiple dates.
 *
 * @param dates - The dates.
 * @param props - The props.
 * @returns - The formatted dates or an empty string.
 */
function safeMultipleDatesFormat(dates, props) {
  if (!(dates === null || dates === void 0 ? void 0 : dates.length)) {
    return "";
  }
  var formattedFirstDate = dates[0] ? safeDateFormat(dates[0], props) : "";
  if (dates.length === 1) {
    return formattedFirstDate;
  }
  if (dates.length === 2 && dates[1]) {
    var formattedSecondDate = safeDateFormat(dates[1], props);
    return "".concat(formattedFirstDate, ", ").concat(formattedSecondDate);
  }
  var extraDatesCount = dates.length - 1;
  return "".concat(formattedFirstDate, " (+").concat(extraDatesCount, ")");
}
// ** Date Setters **
/**
 * Sets the time for a given date.
 *
 * @param date - The date.
 * @param time - An object containing the hour, minute, and second.
 * @returns - The date with the time set.
 */
function setTime(date, _a) {
  var _b = _a.hour,
    hour = _b === void 0 ? 0 : _b,
    _c = _a.minute,
    minute = _c === void 0 ? 0 : _c,
    _d = _a.second,
    second = _d === void 0 ? 0 : _d;
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}
/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
function getWeek(date) {
  return getISOWeek(date);
}
/**
 * Gets the day of the week code for a given day.
 *
 * @param day - The day.
 * @param locale - The locale.
 * @returns - The day of the week code.
 */
function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
}
// *** Start of ***
/**
 * Gets the start of the day for a given date.
 *
 * @param date - The date.
 * @returns - The start of the day.
 */
function getStartOfDay(date) {
  return startOfDay(date);
}
/**
 * Gets the start of the week for a given date.
 *
 * @param date - The date.
 * @param locale - The locale.
 * @param calendarStartDay - The day the calendar starts on.
 * @returns - The start of the week.
 */
function getStartOfWeek(date, locale, calendarStartDay) {
  var localeObj = locale
    ? getLocaleObject(locale)
    : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, {
    locale: localeObj,
    weekStartsOn: calendarStartDay,
  });
}
/**
 * Gets the start of the month for a given date.
 *
 * @param date - The date.
 * @returns - The start of the month.
 */
function getStartOfMonth(date) {
  return startOfMonth(date);
}
/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
function getStartOfYear(date) {
  return startOfYear(date);
}
/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
function getStartOfQuarter(date) {
  return startOfQuarter(date);
}
/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
function getStartOfToday() {
  return startOfDay(newDate());
}
// *** End of ***
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
function getEndOfDay(date) {
  return endOfDay(date);
}
/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
function getEndOfWeek(date) {
  return endOfWeek(date);
}
/**
 * Gets the end of the month for a given date.
 *
 * @param date - The date.
 * @returns - The end of the month.
 */
function getEndOfMonth(date) {
  return endOfMonth(date);
}
/**
 * Checks if two dates are in the same year.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same year, false otherwise.
 */
function isSameYear(date1, date2) {
  if (date1 && date2) {
    return isSameYear$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are in the same month.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same month, false otherwise.
 */
function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return isSameMonth$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are in the same quarter.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same quarter, false otherwise.
 */
function isSameQuarter(date1, date2) {
  if (date1 && date2) {
    return isSameQuarter$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are on the same day.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are on the same day, false otherwise.
 */
function isSameDay(date1, date2) {
  if (date1 && date2) {
    return isSameDay$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if two dates are equal.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are equal, false otherwise.
 */
function isEqual(date1, date2) {
  if (date1 && date2) {
    return isEqual$1(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
/**
 * Checks if a day is within a date range.
 *
 * @param day - The day to check.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns - True if the day is within the range, false otherwise.
 */
function isDayInRange(day, startDate, endDate) {
  var valid;
  var start = startOfDay(startDate);
  var end = endOfDay(endDate);
  try {
    valid = isWithinInterval(day, { start: start, end: end });
  } catch (err) {
    valid = false;
  }
  return valid;
}
// ** Date Localization **
/**
 * Registers a locale.
 *
 * @param localeName - The name of the locale.
 * @param localeData - The data of the locale.
 */
function registerLocale(localeName, localeData) {
  var scope = getLocaleScope();
  if (!scope.__localeData__) {
    scope.__localeData__ = {};
  }
  scope.__localeData__[localeName] = localeData;
}
/**
 * Sets the default locale.
 *
 * @param localeName - The name of the locale.
 */
function setDefaultLocale(localeName) {
  var scope = getLocaleScope();
  scope.__localeId__ = localeName;
}
/**
 * Gets the default locale.
 *
 * @returns - The default locale.
 */
function getDefaultLocale() {
  var scope = getLocaleScope();
  return scope.__localeId__;
}
/**
 * Gets the locale object.
 *
 * @param localeSpec - The locale specification.
 * @returns - The locale object.
 */
function getLocaleObject(localeSpec) {
  if (typeof localeSpec === "string") {
    // Treat it as a locale name registered by registerLocale
    var scope = getLocaleScope();
    // Null was replaced with undefined to avoid type coercion
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : undefined;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
}
/**
 * Formats the weekday in a given locale.
 *
 * @param date - The date to format.
 * @param formatFunc - The formatting function.
 * @param locale - The locale to use for formatting.
 * @returns - The formatted weekday.
 */
function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}
/**
 * Gets the minimum weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The minimum weekday.
 */
function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}
/**
 * Gets the short weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short weekday.
 */
function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}
/**
 * Gets the month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The month.
 */
function getMonthInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}
/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}
/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
function getQuarterShortInLocale(quarter, locale) {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
}
/**
 * Checks if a day is disabled.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is disabled, false otherwise.
 */
function isDayDisabled(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    excludeDateIntervals = _b.excludeDateIntervals,
    includeDates = _b.includeDates,
    includeDateIntervals = _b.includeDateIntervals,
    filterDate = _b.filterDate;
  return (
    isOutOfBounds(day, { minDate: minDate, maxDate: maxDate }) ||
    (excludeDates &&
      excludeDates.some(function (excludeDate) {
        if (excludeDate instanceof Date) {
          return isSameDay(day, excludeDate);
        } else {
          return isSameDay(day, excludeDate.date);
        }
      })) ||
    (excludeDateIntervals &&
      excludeDateIntervals.some(function (_a) {
        var start = _a.start,
          end = _a.end;
        return isWithinInterval(day, { start: start, end: end });
      })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameDay(day, includeDate);
      })) ||
    (includeDateIntervals &&
      !includeDateIntervals.some(function (_a) {
        var start = _a.start,
          end = _a.end;
        return isWithinInterval(day, { start: start, end: end });
      })) ||
    (filterDate && !filterDate(newDate(day))) ||
    false
  );
}
/**
 * Checks if a day is excluded.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is excluded, false otherwise.
 */
function isDayExcluded(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    excludeDates = _b.excludeDates,
    excludeDateIntervals = _b.excludeDateIntervals;
  if (excludeDateIntervals && excludeDateIntervals.length > 0) {
    return excludeDateIntervals.some(function (_a) {
      var start = _a.start,
        end = _a.end;
      return isWithinInterval(day, { start: start, end: end });
    });
  }
  return (
    (excludeDates &&
      excludeDates.some(function (excludeDate) {
        var _a;
        if (excludeDate instanceof Date) {
          return isSameDay(day, excludeDate);
        } else {
          return isSameDay(
            day,
            (_a = excludeDate.date) !== null && _a !== void 0 ? _a : new Date(),
          );
        }
      })) ||
    false
  );
}
function isMonthDisabled(month, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates,
    filterDate = _b.filterDate;
  return (
    isOutOfBounds(month, {
      minDate: minDate ? startOfMonth(minDate) : undefined,
      maxDate: maxDate ? endOfMonth(maxDate) : undefined,
    }) ||
    (excludeDates === null || excludeDates === void 0
      ? void 0
      : excludeDates.some(function (excludeDate) {
          return isSameMonth(
            month,
            excludeDate instanceof Date ? excludeDate : excludeDate.date,
          );
        })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameMonth(month, includeDate);
      })) ||
    (filterDate && !filterDate(newDate(month))) ||
    false
  );
}
function isMonthInRange(startDate, endDate, m, day) {
  var startDateYear = getYear(startDate);
  var startDateMonth = getMonth(startDate);
  var endDateYear = getYear(endDate);
  var endDateMonth = getMonth(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateMonth <= m) ||
      (dayYear === endDateYear && endDateMonth >= m) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
  return false;
}
/**
 * To check if a date's month and year are disabled/excluded
 * @param date Date to check
 * @returns {boolean} true if month and year are disabled/excluded, false otherwise
 */
function isMonthYearDisabled(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates;
  return (
    isOutOfBounds(date, { minDate: minDate, maxDate: maxDate }) ||
    (excludeDates &&
      excludeDates.some(function (excludedDate) {
        return isSameMonth(
          excludedDate instanceof Date ? excludedDate : excludedDate.date,
          date,
        );
      })) ||
    (includeDates &&
      !includeDates.some(function (includedDate) {
        return isSameMonth(includedDate, date);
      })) ||
    false
  );
}
function isQuarterDisabled(quarter, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates,
    filterDate = _b.filterDate;
  return (
    isOutOfBounds(quarter, { minDate: minDate, maxDate: maxDate }) ||
    (excludeDates === null || excludeDates === void 0
      ? void 0
      : excludeDates.some(function (excludeDate) {
          return isSameQuarter(
            quarter,
            excludeDate instanceof Date ? excludeDate : excludeDate.date,
          );
        })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameQuarter(quarter, includeDate);
      })) ||
    (filterDate && !filterDate(newDate(quarter))) ||
    false
  );
}
function isYearInRange(year, start, end) {
  if (!start || !end) return false;
  if (!isValid$1(start) || !isValid$1(end)) return false;
  var startYear = getYear(start);
  var endYear = getYear(end);
  return startYear <= year && endYear >= year;
}
function isYearDisabled(year, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    maxDate = _b.maxDate,
    excludeDates = _b.excludeDates,
    includeDates = _b.includeDates,
    filterDate = _b.filterDate;
  var date = new Date(year, 0, 1);
  return (
    isOutOfBounds(date, {
      minDate: minDate ? startOfYear(minDate) : undefined,
      maxDate: maxDate ? endOfYear(maxDate) : undefined,
    }) ||
    (excludeDates === null || excludeDates === void 0
      ? void 0
      : excludeDates.some(function (excludeDate) {
          return isSameYear(
            date,
            excludeDate instanceof Date ? excludeDate : excludeDate.date,
          );
        })) ||
    (includeDates &&
      !includeDates.some(function (includeDate) {
        return isSameYear(date, includeDate);
      })) ||
    (filterDate && !filterDate(newDate(date))) ||
    false
  );
}
function isQuarterInRange(startDate, endDate, q, day) {
  var startDateYear = getYear(startDate);
  var startDateQuarter = getQuarter(startDate);
  var endDateYear = getYear(endDate);
  var endDateQuarter = getQuarter(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateQuarter <= q && q <= endDateQuarter;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateQuarter <= q) ||
      (dayYear === endDateYear && endDateQuarter >= q) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
  return false;
}
function isOutOfBounds(day, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a,
    minDate = _c.minDate,
    maxDate = _c.maxDate;
  return (_b =
    (minDate && differenceInCalendarDays(day, minDate) < 0) ||
    (maxDate && differenceInCalendarDays(day, maxDate) > 0)) !== null &&
    _b !== void 0
    ? _b
    : false;
}
function isTimeInList(time, times) {
  return times.some(function (listTime) {
    return (
      getHours(listTime) === getHours(time) &&
      getMinutes(listTime) === getMinutes(time) &&
      getSeconds(listTime) === getSeconds(time)
    );
  });
}
function isTimeDisabled(time, _a) {
  var _b = _a === void 0 ? {} : _a,
    excludeTimes = _b.excludeTimes,
    includeTimes = _b.includeTimes,
    filterTime = _b.filterTime;
  return (
    (excludeTimes && isTimeInList(time, excludeTimes)) ||
    (includeTimes && !isTimeInList(time, includeTimes)) ||
    (filterTime && !filterTime(time)) ||
    false
  );
}
function isTimeInDisabledRange(time, _a) {
  var minTime = _a.minTime,
    maxTime = _a.maxTime;
  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }
  var baseTime = newDate();
  baseTime = setHours(baseTime, getHours(time));
  baseTime = setMinutes(baseTime, getMinutes(time));
  baseTime = setSeconds(baseTime, getSeconds(time));
  var min = newDate();
  min = setHours(min, getHours(minTime));
  min = setMinutes(min, getMinutes(minTime));
  min = setSeconds(min, getSeconds(minTime));
  var max = newDate();
  max = setHours(max, getHours(maxTime));
  max = setMinutes(max, getMinutes(maxTime));
  max = setSeconds(max, getSeconds(maxTime));
  var valid;
  try {
    valid = !isWithinInterval(baseTime, { start: min, end: max });
  } catch (err) {
    valid = false;
  }
  return valid;
}
function monthDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var previousMonth = subMonths(day, 1);
  return (
    (minDate && differenceInCalendarMonths(minDate, previousMonth) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarMonths(includeDate, previousMonth) > 0;
      })) ||
    false
  );
}
function monthDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var nextMonth = addMonths(day, 1);
  return (
    (maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarMonths(nextMonth, includeDate) > 0;
      })) ||
    false
  );
}
function quarterDisabledBefore(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var firstDateOfYear = startOfYear(date);
  var previousQuarter = subQuarters(firstDateOfYear, 1);
  return (
    (minDate && differenceInCalendarQuarters(minDate, previousQuarter) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
      })) ||
    false
  );
}
function quarterDisabledAfter(date, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var lastDateOfYear = endOfYear(date);
  var nextQuarter = addQuarters(lastDateOfYear, 1);
  return (
    (maxDate && differenceInCalendarQuarters(nextQuarter, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
      })) ||
    false
  );
}
function yearDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    includeDates = _b.includeDates;
  var previousYear = subYears(day, 1);
  return (
    (minDate && differenceInCalendarYears(minDate, previousYear) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarYears(includeDate, previousYear) > 0;
      })) ||
    false
  );
}
function yearsDisabledBefore(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    minDate = _b.minDate,
    _c = _b.yearItemNumber,
    yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var previousYear = getStartOfYear(subYears(day, yearItemNumber));
  var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
  var minDateYear = minDate && getYear(minDate);
  return (minDateYear && minDateYear > endPeriod) || false;
}
function yearDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    includeDates = _b.includeDates;
  var nextYear = addYears(day, 1);
  return (
    (maxDate && differenceInCalendarYears(nextYear, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(function (includeDate) {
        return differenceInCalendarYears(nextYear, includeDate) > 0;
      })) ||
    false
  );
}
function yearsDisabledAfter(day, _a) {
  var _b = _a === void 0 ? {} : _a,
    maxDate = _b.maxDate,
    _c = _b.yearItemNumber,
    yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var nextYear = addYears(day, yearItemNumber);
  var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
  var maxDateYear = maxDate && getYear(maxDate);
  return (maxDateYear && maxDateYear < startPeriod) || false;
}
function getEffectiveMinDate(_a) {
  var minDate = _a.minDate,
    includeDates = _a.includeDates;
  if (includeDates && minDate) {
    var minDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays(includeDate, minDate) >= 0;
    });
    return min(minDates);
  } else if (includeDates) {
    return min(includeDates);
  } else {
    return minDate;
  }
}
function getEffectiveMaxDate(_a) {
  var maxDate = _a.maxDate,
    includeDates = _a.includeDates;
  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays(includeDate, maxDate) <= 0;
    });
    return max(maxDates);
  } else if (includeDates) {
    return max(includeDates);
  } else {
    return maxDate;
  }
}
/**
 * Get a map of highlighted dates with their corresponding classes.
 * @param highlightDates The dates to highlight.
 * @param defaultClassName The default class to use for highlighting.
 * @returns A map with dates as keys and arrays of class names as values.
 */
function getHighLightDaysMap(highlightDates, defaultClassName) {
  var _a;
  if (highlightDates === void 0) {
    highlightDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--highlighted";
  }
  var dateClasses = new Map();
  for (var i = 0, len = highlightDates.length; i < len; i++) {
    var obj = highlightDates[i];
    if (isDate(obj)) {
      var key = formatDate(obj, "MM.dd.yyyy");
      var classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (typeof obj === "object") {
      var keys = Object.keys(obj);
      var className = (_a = keys[0]) !== null && _a !== void 0 ? _a : "";
      var arrOfDates = obj[className];
      if (typeof className === "string" && Array.isArray(arrOfDates)) {
        for (var k = 0, len_1 = arrOfDates.length; k < len_1; k++) {
          var dateK = arrOfDates[k];
          if (dateK) {
            var key = formatDate(dateK, "MM.dd.yyyy");
            var classNamesArr = dateClasses.get(key) || [];
            if (!classNamesArr.includes(className)) {
              classNamesArr.push(className);
              dateClasses.set(key, classNamesArr);
            }
          }
        }
      }
    }
  }
  return dateClasses;
}
/**
 * Compare the two arrays
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @returns true, if the passed arrays are equal, false otherwise.
 */
function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every(function (value, index) {
    return value === array2[index];
  });
}
/**
 * Assign the custom class to each date
 * @param holidayDates array of object containing date and name of the holiday
 * @param defaultClassName className to be added.
 * @returns Map containing date as key and array of className and holiday name as value
 */
function getHolidaysMap(holidayDates, defaultClassName) {
  if (holidayDates === void 0) {
    holidayDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--holidays";
  }
  var dateClasses = new Map();
  holidayDates.forEach(function (holiday) {
    var dateObj = holiday.date,
      holidayName = holiday.holidayName;
    if (!isDate(dateObj)) {
      return;
    }
    var key = formatDate(dateObj, "MM.dd.yyyy");
    var classNamesObj = dateClasses.get(key) || {
      className: "",
      holidayNames: [],
    };
    if (
      "className" in classNamesObj &&
      classNamesObj["className"] === defaultClassName &&
      arraysAreEqual(classNamesObj["holidayNames"], [holidayName])
    ) {
      return;
    }
    classNamesObj["className"] = defaultClassName;
    var holidayNameArr = classNamesObj["holidayNames"];
    classNamesObj["holidayNames"] = holidayNameArr
      ? __spreadArray(
          __spreadArray([], holidayNameArr, true),
          [holidayName],
          false,
        )
      : [holidayName];
    dateClasses.set(key, classNamesObj);
  });
  return dateClasses;
}
/**
 * Determines the times to inject after a given start of day, current time, and multiplier.
 * @param startOfDay The start of the day.
 * @param currentTime The current time.
 * @param currentMultiplier The current multiplier.
 * @param intervals The intervals.
 * @param injectedTimes The times to potentially inject.
 * @returns An array of times to inject.
 */
function timesToInjectAfter(
  startOfDay,
  currentTime,
  currentMultiplier,
  intervals,
  injectedTimes,
) {
  var l = injectedTimes.length;
  var times = [];
  for (var i = 0; i < l; i++) {
    var injectedTime = startOfDay;
    var injectedTimeValue = injectedTimes[i];
    if (injectedTimeValue) {
      injectedTime = addHours(injectedTime, getHours(injectedTimeValue));
      injectedTime = addMinutes(injectedTime, getMinutes(injectedTimeValue));
      injectedTime = addSeconds(injectedTime, getSeconds(injectedTimeValue));
    }
    var nextTime = addMinutes(startOfDay, (currentMultiplier + 1) * intervals);
    if (
      isAfter(injectedTime, currentTime) &&
      isBefore(injectedTime, nextTime) &&
      injectedTimeValue != undefined
    ) {
      times.push(injectedTimeValue);
    }
  }
  return times;
}
/**
 * Adds a leading zero to a number if it's less than 10.
 * @param i The number to add a leading zero to.
 * @returns The number as a string, with a leading zero if it was less than 10.
 */
function addZero(i) {
  return i < 10 ? "0".concat(i) : "".concat(i);
}
/**
 * Gets the start and end years for a period.
 * @param date The date to get the period for.
 * @param yearItemNumber The number of years in the period. Defaults to DEFAULT_YEAR_ITEM_NUMBER.
 * @returns An object with the start and end years for the period.
 */
function getYearsPeriod(date, yearItemNumber) {
  if (yearItemNumber === void 0) {
    yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER;
  }
  var endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
  var startPeriod = endPeriod - (yearItemNumber - 1);
  return { startPeriod: startPeriod, endPeriod: endPeriod };
}
/**
 * Gets the number of hours in a day.
 * @param d The date to get the number of hours for.
 * @returns The number of hours in the day.
 */
function getHoursInDay(d) {
  var startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var startOfTheNextDay = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    24,
  );
  return Math.round((+startOfTheNextDay - +startOfDay) / 3600000);
}
/**
 * Returns the start of the minute for the given date
 *
 * NOTE: this function is a DST and timezone-safe analog of `date-fns/startOfMinute`
 * do not make changes unless you know what you're doing
 *
 * See comments on https://github.com/Hacker0x01/react-datepicker/pull/4244
 * for more details
 *
 * @param d date
 * @returns start of the minute
 */
function startOfMinute(d) {
  var seconds = d.getSeconds();
  var milliseconds = d.getMilliseconds();
  return toDate(d.getTime() - seconds * 1000 - milliseconds);
}
/**
 * Returns whether the given dates are in the same minute
 *
 * This function is a DST and timezone-safe analog of `date-fns/isSameMinute`
 *
 * @param d1
 * @param d2
 * @returns
 */
function isSameMinute(d1, d2) {
  return startOfMinute(d1).getTime() === startOfMinute(d2).getTime();
}
/**
 * Returns a new datetime object representing the input date with midnight time
 * @param date The date to get the midnight time for
 * @returns A new datetime object representing the input date with midnight time
 */
function getMidnightDate(date) {
  if (!isDate(date)) {
    throw new Error("Invalid date");
  }
  var dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
}
/**
 * Is the first date before the second one?
 * @param date The date that should be before the other one to return true
 * @param dateToCompare The date to compare with
 * @returns The first date is before the second date
 *
 * Note:
 *  This function considers the mid-night of the given dates for comparison.
 *  It evaluates whether date is before dateToCompare based on their mid-night timestamps.
 */
function isDateBefore(date, dateToCompare) {
  if (!isDate(date) || !isDate(dateToCompare)) {
    throw new Error("Invalid date received");
  }
  var midnightDate = getMidnightDate(date);
  var midnightDateToCompare = getMidnightDate(dateToCompare);
  return isBefore(midnightDate, midnightDateToCompare);
}
/**
 * Checks if the space key was pressed down.
 *
 * @param event - The keyboard event.
 * @returns - Returns true if the space key was pressed down, false otherwise.
 */
function isSpaceKeyDown(event) {
  return event.key === KeyType.Space;
}

/**
 * `InputTime` is a React component that manages time input.
 *
 * @component
 * @example
 * <InputTime timeString="12:00" />
 *
 * @param props - The properties that define the `InputTime` component.
 * @param props.onChange - Function that is called when the date changes.
 * @param props.date - The initial date value.
 * @param props.timeString - The initial time string value.
 * @param props.timeInputLabel - The label for the time input.
 * @param props.customTimeInput - An optional custom time input element.
 *
 * @returns The `InputTime` component.
 */
var InputTime = /** @class */ (function (_super) {
  __extends(InputTime, _super);
  function InputTime(props) {
    var _this = _super.call(this, props) || this;
    _this.inputRef = React.createRef();
    _this.onTimeChange = function (time) {
      var _a, _b;
      _this.setState({ time: time });
      var propDate = _this.props.date;
      var isPropDateValid = propDate instanceof Date && !isNaN(+propDate);
      var date = isPropDateValid ? propDate : new Date();
      if (time === null || time === void 0 ? void 0 : time.includes(":")) {
        var _c = time.split(":"),
          hours = _c[0],
          minutes = _c[1];
        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));
      }
      (_b = (_a = _this.props).onChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, date);
    };
    _this.renderTimeInput = function () {
      var time = _this.state.time;
      var _a = _this.props,
        date = _a.date,
        timeString = _a.timeString,
        customTimeInput = _a.customTimeInput;
      if (customTimeInput) {
        return cloneElement(customTimeInput, {
          date: date,
          value: time,
          onChange: _this.onTimeChange,
        });
      }
      return React.createElement("input", {
        type: "time",
        className: "react-datepicker-time__input",
        placeholder: "Time",
        name: "time-input",
        ref: _this.inputRef,
        onClick: function () {
          var _a;
          (_a = _this.inputRef.current) === null || _a === void 0
            ? void 0
            : _a.focus();
        },
        required: true,
        value: time,
        onChange: function (event) {
          _this.onTimeChange(event.target.value || timeString);
        },
      });
    };
    _this.state = {
      time: _this.props.timeString,
    };
    return _this;
  }
  InputTime.getDerivedStateFromProps = function (props, state) {
    if (props.timeString !== state.time) {
      return {
        time: props.timeString,
      };
    }
    // Return null to indicate no change to state.
    return null;
  };
  InputTime.prototype.render = function () {
    return React.createElement(
      "div",
      { className: "react-datepicker__input-time-container" },
      React.createElement(
        "div",
        { className: "react-datepicker-time__caption" },
        this.props.timeInputLabel,
      ),
      React.createElement(
        "div",
        { className: "react-datepicker-time__input-container" },
        React.createElement(
          "div",
          { className: "react-datepicker-time__input" },
          this.renderTimeInput(),
        ),
      ),
    );
  };
  return InputTime;
})(Component);

/**
 * `Day` is a React component that represents a single day in a date picker.
 * It handles the rendering and interaction of a day.
 *
 * @prop ariaLabelPrefixWhenEnabled - Aria label prefix when the day is enabled.
 * @prop ariaLabelPrefixWhenDisabled - Aria label prefix when the day is disabled.
 * @prop disabledKeyboardNavigation - Whether keyboard navigation is disabled.
 * @prop day - The day to be displayed.
 * @prop dayClassName - Function to customize the CSS class of the day.
 * @prop endDate - The end date in a range.
 * @prop highlightDates - Map of dates to be highlighted.
 * @prop holidays - Map of holiday dates.
 * @prop inline - Whether the date picker is inline.
 * @prop shouldFocusDayInline - Whether the day should be focused when date picker is inline.
 * @prop month - The month the day belongs to.
 * @prop onClick - Click event handler.
 * @prop onMouseEnter - Mouse enter event handler.
 * @prop handleOnKeyDown - Key down event handler.
 * @prop usePointerEvent - Whether to use pointer events.
 * @prop preSelection - The date that is currently selected.
 * @prop selected - The selected date.
 * @prop selectingDate - The date currently being selected.
 * @prop selectsEnd - Whether the day can be the end date in a range.
 * @prop selectsStart - Whether the day can be the start date in a range.
 * @prop selectsRange - Whether the day can be in a range.
 * @prop showWeekPicker - Whether to show week picker.
 * @prop showWeekNumber - Whether to show week numbers.
 * @prop selectsDisabledDaysInRange - Whether to select disabled days in a range.
 * @prop selectsMultiple - Whether to allow multiple date selection.
 * @prop selectedDates - Array of selected dates.
 * @prop startDate - The start date in a range.
 * @prop renderDayContents - Function to customize the rendering of the day's contents.
 * @prop containerRef - Ref for the container.
 * @prop excludeDates - Array of dates to be excluded.
 * @prop calendarStartDay - The start day of the week.
 * @prop locale - The locale object.
 * @prop monthShowsDuplicateDaysEnd - Whether to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Whether to show duplicate days at the start of the month.
 * @prop includeDates - Array of dates to be included.
 * @prop includeDateIntervals - Array of date intervals to be included.
 * @prop minDate - The minimum date that can be selected.
 * @prop maxDate - The maximum date that can be selected.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import Day from './day';
 *
 * function MyComponent() {
 *   const handleDayClick = (event) => {
 *     console.log('Day clicked', event);
 *   };
 *
 *   const handleDayMouseEnter = (event) => {
 *     console.log('Mouse entered day', event);
 *   };
 *
 *   const renderDayContents = (date) => {
 *     return <div>{date.getDate()}</div>;
 *   };
 *
 *   return (
 *     <Day
 *       day={new Date()}
 *       onClick={handleDayClick}
 *       onMouseEnter={handleDayMouseEnter}
 *       renderDayContents={renderDayContents}
 *     />
 *   );
 * }
 *
 * export default MyComponent;
 * ```
 */
var Day = /** @class */ (function (_super) {
  __extends(Day, _super);
  function Day() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.dayEl = createRef();
    _this.handleClick = function (event) {
      if (!_this.isDisabled() && _this.props.onClick) {
        _this.props.onClick(event);
      }
    };
    _this.handleMouseEnter = function (event) {
      if (!_this.isDisabled() && _this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    };
    _this.handleOnKeyDown = function (event) {
      var _a, _b;
      var eventKey = event.key;
      if (eventKey === KeyType.Space) {
        event.preventDefault();
        event.key = KeyType.Enter;
      }
      (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
    };
    _this.isSameDay = function (other) {
      return isSameDay(_this.props.day, other);
    };
    _this.isKeyboardSelected = function () {
      var _a;
      if (_this.props.disabledKeyboardNavigation) {
        return false;
      }
      var isSelectedDate = _this.props.selectsMultiple
        ? (_a = _this.props.selectedDates) === null || _a === void 0
          ? void 0
          : _a.some(function (date) {
              return _this.isSameDayOrWeek(date);
            })
        : _this.isSameDayOrWeek(_this.props.selected);
      var isDisabled =
        _this.props.preSelection && _this.isDisabled(_this.props.preSelection);
      return (
        !isSelectedDate &&
        _this.isSameDayOrWeek(_this.props.preSelection) &&
        !isDisabled
      );
    };
    _this.isDisabled = function (day) {
      if (day === void 0) {
        day = _this.props.day;
      }
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayDisabled(day, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
        includeDateIntervals: _this.props.includeDateIntervals,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.isExcluded = function () {
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayExcluded(_this.props.day, {
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
      });
    };
    _this.isStartOfWeek = function () {
      return isSameDay(
        _this.props.day,
        getStartOfWeek(
          _this.props.day,
          _this.props.locale,
          _this.props.calendarStartDay,
        ),
      );
    };
    _this.isSameWeek = function (other) {
      return (
        _this.props.showWeekPicker &&
        isSameDay(
          other,
          getStartOfWeek(
            _this.props.day,
            _this.props.locale,
            _this.props.calendarStartDay,
          ),
        )
      );
    };
    _this.isSameDayOrWeek = function (other) {
      return _this.isSameDay(other) || _this.isSameWeek(other);
    };
    _this.getHighLightedClass = function () {
      var _a = _this.props,
        day = _a.day,
        highlightDates = _a.highlightDates;
      if (!highlightDates) {
        return false;
      }
      // Looking for className in the Map of {'day string, 'className'}
      var dayStr = formatDate(day, "MM.dd.yyyy");
      return highlightDates.get(dayStr);
    };
    // Function to return the array containing className associated to the date
    _this.getHolidaysClass = function () {
      var _a;
      var _b = _this.props,
        day = _b.day,
        holidays = _b.holidays;
      if (!holidays) {
        // For type consistency no other reasons
        return [undefined];
      }
      var dayStr = formatDate(day, "MM.dd.yyyy");
      // Looking for className in the Map of {day string: {className, holidayName}}
      if (holidays.has(dayStr)) {
        return [
          (_a = holidays.get(dayStr)) === null || _a === void 0
            ? void 0
            : _a.className,
        ];
      }
      // For type consistency no other reasons
      return [undefined];
    };
    _this.isInRange = function () {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isDayInRange(day, startDate, endDate);
    };
    _this.isInSelectingRange = function () {
      var _a;
      var _b = _this.props,
        day = _b.day,
        selectsStart = _b.selectsStart,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange,
        selectsDisabledDaysInRange = _b.selectsDisabledDaysInRange,
        startDate = _b.startDate,
        endDate = _b.endDate;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (
        !(selectsStart || selectsEnd || selectsRange) ||
        !selectingDate ||
        (!selectsDisabledDaysInRange && _this.isDisabled())
      ) {
        return false;
      }
      if (
        selectsStart &&
        endDate &&
        (isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))
      ) {
        return isDayInRange(day, selectingDate, endDate);
      }
      if (
        selectsEnd &&
        startDate &&
        !endDate &&
        (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))
      ) {
        return isDayInRange(day, startDate, selectingDate);
      }
      if (
        selectsRange &&
        startDate &&
        !endDate &&
        (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))
      ) {
        return isDayInRange(day, startDate, selectingDate);
      }
      return false;
    };
    _this.isSelectingRangeStart = function () {
      var _a;
      if (!_this.isInSelectingRange()) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        startDate = _b.startDate,
        selectsStart = _b.selectsStart;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsStart) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, startDate);
      }
    };
    _this.isSelectingRangeEnd = function () {
      var _a;
      if (!_this.isInSelectingRange()) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        endDate = _b.endDate,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsEnd || selectsRange) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, endDate);
      }
    };
    _this.isRangeStart = function () {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(startDate, day);
    };
    _this.isRangeEnd = function () {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(endDate, day);
    };
    _this.isWeekend = function () {
      var weekday = getDay(_this.props.day);
      return weekday === 0 || weekday === 6;
    };
    _this.isAfterMonth = function () {
      return (
        _this.props.month !== undefined &&
        (_this.props.month + 1) % 12 === getMonth(_this.props.day)
      );
    };
    _this.isBeforeMonth = function () {
      return (
        _this.props.month !== undefined &&
        (getMonth(_this.props.day) + 1) % 12 === _this.props.month
      );
    };
    _this.isCurrentDay = function () {
      return _this.isSameDay(newDate());
    };
    _this.isSelected = function () {
      var _a;
      if (_this.props.selectsMultiple) {
        return (_a = _this.props.selectedDates) === null || _a === void 0
          ? void 0
          : _a.some(function (date) {
              return _this.isSameDayOrWeek(date);
            });
      }
      return _this.isSameDayOrWeek(_this.props.selected);
    };
    _this.getClassNames = function (date) {
      var dayClassName = _this.props.dayClassName
        ? _this.props.dayClassName(date)
        : undefined;
      return clsx(
        "react-datepicker__day",
        dayClassName,
        "react-datepicker__day--" + getDayOfWeekCode(_this.props.day),
        {
          "react-datepicker__day--disabled": _this.isDisabled(),
          "react-datepicker__day--excluded": _this.isExcluded(),
          "react-datepicker__day--selected": _this.isSelected(),
          "react-datepicker__day--keyboard-selected":
            _this.isKeyboardSelected(),
          "react-datepicker__day--range-start": _this.isRangeStart(),
          "react-datepicker__day--range-end": _this.isRangeEnd(),
          "react-datepicker__day--in-range": _this.isInRange(),
          "react-datepicker__day--in-selecting-range":
            _this.isInSelectingRange(),
          "react-datepicker__day--selecting-range-start":
            _this.isSelectingRangeStart(),
          "react-datepicker__day--selecting-range-end":
            _this.isSelectingRangeEnd(),
          "react-datepicker__day--today": _this.isCurrentDay(),
          "react-datepicker__day--weekend": _this.isWeekend(),
          "react-datepicker__day--outside-month":
            _this.isAfterMonth() || _this.isBeforeMonth(),
        },
        _this.getHighLightedClass(),
        _this.getHolidaysClass(),
      );
    };
    _this.getAriaLabel = function () {
      var _a = _this.props,
        day = _a.day,
        _b = _a.ariaLabelPrefixWhenEnabled,
        ariaLabelPrefixWhenEnabled = _b === void 0 ? "Choose" : _b,
        _c = _a.ariaLabelPrefixWhenDisabled,
        ariaLabelPrefixWhenDisabled = _c === void 0 ? "Not available" : _c;
      var prefix =
        _this.isDisabled() || _this.isExcluded()
          ? ariaLabelPrefixWhenDisabled
          : ariaLabelPrefixWhenEnabled;
      return ""
        .concat(prefix, " ")
        .concat(formatDate(day, "PPPP", _this.props.locale));
    };
    // A function to return the holiday's name as title's content
    _this.getTitle = function () {
      var _a = _this.props,
        day = _a.day,
        _b = _a.holidays,
        holidays = _b === void 0 ? new Map() : _b,
        excludeDates = _a.excludeDates;
      var compareDt = formatDate(day, "MM.dd.yyyy");
      var titles = [];
      if (holidays.has(compareDt)) {
        titles.push.apply(titles, holidays.get(compareDt).holidayNames);
      }
      if (_this.isExcluded()) {
        titles.push(
          excludeDates === null || excludeDates === void 0
            ? void 0
            : excludeDates
                .filter(function (excludeDate) {
                  if (excludeDate instanceof Date) {
                    return isSameDay(excludeDate, day);
                  }
                  return isSameDay(
                    excludeDate === null || excludeDate === void 0
                      ? void 0
                      : excludeDate.date,
                    day,
                  );
                })
                .map(function (excludeDate) {
                  if (excludeDate instanceof Date) {
                    return undefined;
                  }
                  return excludeDate === null || excludeDate === void 0
                    ? void 0
                    : excludeDate.message;
                }),
        );
      }
      // I'm not sure that this is a right output, but all tests are green
      return titles.join(", ");
    };
    _this.getTabIndex = function () {
      var selectedDay = _this.props.selected;
      var preSelectionDay = _this.props.preSelection;
      var tabIndex =
        !(
          _this.props.showWeekPicker &&
          (_this.props.showWeekNumber || !_this.isStartOfWeek())
        ) &&
        (_this.isKeyboardSelected() ||
          (_this.isSameDay(selectedDay) &&
            isSameDay(preSelectionDay, selectedDay)))
          ? 0
          : -1;
      return tabIndex;
    };
    // various cases when we need to apply focus to the preselected day
    // focus the day on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
    // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
    _this.handleFocusDay = function () {
      var _a;
      // only do this while the input isn't focused
      // otherwise, typing/backspacing the date manually may steal focus away from the input
      _this.shouldFocusDay() &&
        ((_a = _this.dayEl.current) === null || _a === void 0
          ? void 0
          : _a.focus({ preventScroll: true }));
    };
    _this.renderDayContents = function () {
      if (_this.props.monthShowsDuplicateDaysEnd && _this.isAfterMonth())
        return null;
      if (_this.props.monthShowsDuplicateDaysStart && _this.isBeforeMonth())
        return null;
      return _this.props.renderDayContents
        ? _this.props.renderDayContents(
            getDate(_this.props.day),
            _this.props.day,
          )
        : getDate(_this.props.day);
    };
    _this.render = function () {
      return (
        // TODO: Use <option> instead of the "option" role to ensure accessibility across all devices.
        React.createElement(
          "div",
          {
            ref: _this.dayEl,
            className: _this.getClassNames(_this.props.day),
            onKeyDown: _this.handleOnKeyDown,
            onClick: _this.handleClick,
            onMouseEnter: !_this.props.usePointerEvent
              ? _this.handleMouseEnter
              : undefined,
            onPointerEnter: _this.props.usePointerEvent
              ? _this.handleMouseEnter
              : undefined,
            tabIndex: _this.getTabIndex(),
            "aria-label": _this.getAriaLabel(),
            role: "option",
            title: _this.getTitle(),
            "aria-disabled": _this.isDisabled(),
            "aria-current": _this.isCurrentDay() ? "date" : undefined,
            "aria-selected": _this.isSelected() || _this.isInRange(),
          },
          _this.renderDayContents(),
          _this.getTitle() !== "" &&
            React.createElement(
              "span",
              { className: "overlay" },
              _this.getTitle(),
            ),
        )
      );
    };
    return _this;
  }
  Day.prototype.componentDidMount = function () {
    this.handleFocusDay();
  };
  Day.prototype.componentDidUpdate = function () {
    this.handleFocusDay();
  };
  Day.prototype.shouldFocusDay = function () {
    var shouldFocusDay = false;
    if (this.getTabIndex() === 0 && this.isSameDay(this.props.preSelection)) {
      // there is currently no activeElement and not inline
      if (!document.activeElement || document.activeElement === document.body) {
        shouldFocusDay = true;
      }
      // inline version:
      // do not focus on initial render to prevent autoFocus issue
      // focus after month has changed via keyboard
      if (this.props.inline && !this.props.shouldFocusDayInline) {
        shouldFocusDay = false;
      }
      if (this.isDayActiveElement()) {
        shouldFocusDay = true;
      }
      if (this.isDuplicateDay()) {
        shouldFocusDay = false;
      }
    }
    return shouldFocusDay;
  };
  // the activeElement is in the container, and it is another instance of Day
  Day.prototype.isDayActiveElement = function () {
    var _a, _b, _c;
    return (
      ((_b =
        (_a = this.props.containerRef) === null || _a === void 0
          ? void 0
          : _a.current) === null || _b === void 0
        ? void 0
        : _b.contains(document.activeElement)) &&
      ((_c = document.activeElement) === null || _c === void 0
        ? void 0
        : _c.classList.contains("react-datepicker__day"))
    );
  };
  Day.prototype.isDuplicateDay = function () {
    return (
      //day is one of the non rendered duplicate days
      (this.props.monthShowsDuplicateDaysEnd && this.isAfterMonth()) ||
      (this.props.monthShowsDuplicateDaysStart && this.isBeforeMonth())
    );
  };
  return Day;
})(Component);

var WeekNumber = /** @class */ (function (_super) {
  __extends(WeekNumber, _super);
  function WeekNumber() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.weekNumberEl = createRef();
    _this.handleClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    };
    _this.handleOnKeyDown = function (event) {
      var _a, _b;
      var eventKey = event.key;
      if (eventKey === KeyType.Space) {
        event.preventDefault();
        event.key = KeyType.Enter;
      }
      (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
    };
    _this.isKeyboardSelected = function () {
      return (
        !_this.props.disabledKeyboardNavigation &&
        !isSameDay(_this.props.date, _this.props.selected) &&
        isSameDay(_this.props.date, _this.props.preSelection)
      );
    };
    _this.getTabIndex = function () {
      return _this.props.showWeekPicker &&
        _this.props.showWeekNumber &&
        (_this.isKeyboardSelected() ||
          (isSameDay(_this.props.date, _this.props.selected) &&
            isSameDay(_this.props.preSelection, _this.props.selected)))
        ? 0
        : -1;
    };
    // various cases when we need to apply focus to the preselected week-number
    // focus the week-number on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
    // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
    _this.handleFocusWeekNumber = function (prevProps) {
      var shouldFocusWeekNumber = false;
      // only do this while the input isn't focused
      // otherwise, typing/backspacing the date manually may steal focus away from the input
      if (
        _this.getTabIndex() === 0 &&
        !(prevProps === null || prevProps === void 0
          ? void 0
          : prevProps.isInputFocused) &&
        isSameDay(_this.props.date, _this.props.preSelection)
      ) {
        // there is currently no activeElement and not inline
        if (
          !document.activeElement ||
          document.activeElement === document.body
        ) {
          shouldFocusWeekNumber = true;
        }
        // inline version:
        // do not focus on initial render to prevent autoFocus issue
        // focus after month has changed via keyboard
        if (_this.props.inline && !_this.props.shouldFocusDayInline) {
          shouldFocusWeekNumber = false;
        }
        // the activeElement is in the container, and it is another instance of WeekNumber
        if (
          _this.props.containerRef &&
          _this.props.containerRef.current &&
          _this.props.containerRef.current.contains(document.activeElement) &&
          document.activeElement &&
          document.activeElement.classList.contains(
            "react-datepicker__week-number",
          )
        ) {
          shouldFocusWeekNumber = true;
        }
      }
      shouldFocusWeekNumber &&
        _this.weekNumberEl.current &&
        _this.weekNumberEl.current.focus({ preventScroll: true });
    };
    return _this;
  }
  Object.defineProperty(WeekNumber, "defaultProps", {
    get: function () {
      return {
        ariaLabelPrefix: "week ",
      };
    },
    enumerable: false,
    configurable: true,
  });
  WeekNumber.prototype.componentDidMount = function () {
    this.handleFocusWeekNumber();
  };
  WeekNumber.prototype.componentDidUpdate = function (prevProps) {
    this.handleFocusWeekNumber(prevProps);
  };
  WeekNumber.prototype.render = function () {
    var _a = this.props,
      weekNumber = _a.weekNumber,
      isWeekDisabled = _a.isWeekDisabled,
      _b = _a.ariaLabelPrefix,
      ariaLabelPrefix =
        _b === void 0 ? WeekNumber.defaultProps.ariaLabelPrefix : _b,
      onClick = _a.onClick;
    var weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!onClick && !isWeekDisabled,
      "react-datepicker__week-number--selected":
        !!onClick && isSameDay(this.props.date, this.props.selected),
    };
    return React.createElement(
      "div",
      {
        ref: this.weekNumberEl,
        className: clsx(weekNumberClasses),
        "aria-label": ""
          .concat(ariaLabelPrefix, " ")
          .concat(this.props.weekNumber),
        onClick: this.handleClick,
        onKeyDown: this.handleOnKeyDown,
        tabIndex: this.getTabIndex(),
      },
      weekNumber,
    );
  };
  return WeekNumber;
})(Component);

var Week = /** @class */ (function (_super) {
  __extends(Week, _super);
  function Week() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.isDisabled = function (day) {
      return isDayDisabled(day, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
        includeDateIntervals: _this.props.includeDateIntervals,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.handleDayClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    };
    _this.handleDayMouseEnter = function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    };
    _this.handleWeekClick = function (day, weekNumber, event) {
      var _a, _b, _c;
      var enabledWeekDay = new Date(day);
      for (var i = 0; i < 7; i++) {
        var processingDay = new Date(day);
        processingDay.setDate(processingDay.getDate() + i);
        var isEnabled = !_this.isDisabled(processingDay);
        if (isEnabled) {
          enabledWeekDay = processingDay;
          break;
        }
      }
      if (typeof _this.props.onWeekSelect === "function") {
        _this.props.onWeekSelect(enabledWeekDay, weekNumber, event);
      }
      if (_this.props.showWeekPicker) {
        _this.handleDayClick(enabledWeekDay, event);
      }
      if (
        (_a = _this.props.shouldCloseOnSelect) !== null && _a !== void 0
          ? _a
          : Week.defaultProps.shouldCloseOnSelect
      ) {
        (_c = (_b = _this.props).setOpen) === null || _c === void 0
          ? void 0
          : _c.call(_b, false);
      }
    };
    _this.formatWeekNumber = function (date) {
      if (_this.props.formatWeekNumber) {
        return _this.props.formatWeekNumber(date);
      }
      return getWeek(date);
    };
    _this.isWeekDisabled = function () {
      var startOfWeek = _this.startOfWeek();
      var endOfWeek = addDays(startOfWeek, 6);
      var processingDate = new Date(startOfWeek);
      while (processingDate <= endOfWeek) {
        if (!_this.isDisabled(processingDate)) return false;
        processingDate = addDays(processingDate, 1);
      }
      return true;
    };
    _this.renderDays = function () {
      var startOfWeek = _this.startOfWeek();
      var days = [];
      var weekNumber = _this.formatWeekNumber(startOfWeek);
      if (_this.props.showWeekNumber) {
        var onClickAction =
          _this.props.onWeekSelect || _this.props.showWeekPicker
            ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber)
            : undefined;
        days.push(
          React.createElement(
            WeekNumber,
            _assign({ key: "W" }, Week.defaultProps, _this.props, {
              weekNumber: weekNumber,
              isWeekDisabled: _this.isWeekDisabled(),
              date: startOfWeek,
              onClick: onClickAction,
            }),
          ),
        );
      }
      return days.concat(
        [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
          var day = addDays(startOfWeek, offset);
          return React.createElement(
            Day,
            _assign({}, Week.defaultProps, _this.props, {
              ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix,
              ariaLabelPrefixWhenDisabled:
                _this.props.disabledDayAriaLabelPrefix,
              key: day.valueOf(),
              day: day,
              onClick: _this.handleDayClick.bind(_this, day),
              onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
            }),
          );
        }),
      );
    };
    _this.startOfWeek = function () {
      return getStartOfWeek(
        _this.props.day,
        _this.props.locale,
        _this.props.calendarStartDay,
      );
    };
    _this.isKeyboardSelected = function () {
      return (
        !_this.props.disabledKeyboardNavigation &&
        !isSameDay(_this.startOfWeek(), _this.props.selected) &&
        isSameDay(_this.startOfWeek(), _this.props.preSelection)
      );
    };
    return _this;
  }
  Object.defineProperty(Week, "defaultProps", {
    get: function () {
      return {
        shouldCloseOnSelect: true,
      };
    },
    enumerable: false,
    configurable: true,
  });
  Week.prototype.render = function () {
    ({
      "react-datepicker__week--selected": isSameDay(
        this.startOfWeek(),
        this.props.selected,
      ),
      "react-datepicker__week--keyboard-selected": this.isKeyboardSelected(),
    });
    return React.createElement(React.Fragment, null, this.renderDays());
  };
  return Week;
})(Component);

var _a;
var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;
var MONTH_COLUMNS_LAYOUT = {
  TWO_COLUMNS: "two_columns",
  THREE_COLUMNS: "three_columns",
  FOUR_COLUMNS: "four_columns",
};
var MONTH_COLUMNS =
  ((_a = {}),
  (_a[MONTH_COLUMNS_LAYOUT.TWO_COLUMNS] = {
    grid: [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [10, 11],
    ],
    verticalNavigationOffset: 2,
  }),
  (_a[MONTH_COLUMNS_LAYOUT.THREE_COLUMNS] = {
    grid: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 11],
    ],
    verticalNavigationOffset: 3,
  }),
  (_a[MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS] = {
    grid: [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
    ],
    verticalNavigationOffset: 4,
  }),
  _a);
var MONTH_NAVIGATION_HORIZONTAL_OFFSET = 1;
function getMonthColumnsLayout(
  showFourColumnMonthYearPicker,
  showTwoColumnMonthYearPicker,
) {
  if (showFourColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS;
  }
  if (showTwoColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.TWO_COLUMNS;
  }
  return MONTH_COLUMNS_LAYOUT.THREE_COLUMNS;
}
/**
 * `Month` is a React component that represents a month in a calendar.
 * It accepts a `MonthProps` object as props which provides various configurations and event handlers.
 *
 * @prop dayClassName - Function to determine the class name for a day.
 * @prop monthClassName - Function to determine the class name for a month.
 * @prop filterDate - Function to filter dates.
 * @prop formatWeekNumber - Function to format the week number.
 * @prop onDayClick - Function to handle day click events.
 * @prop onDayMouseEnter - Function to handle mouse enter events on a day.
 * @prop onMouseLeave - Function to handle mouse leave events.
 * @prop onWeekSelect - Function to handle week selection.
 * @prop setPreSelection - Function to set pre-selection.
 * @prop setOpen - Function to set open state.
 * @prop renderDayContents - Function to render day contents.
 * @prop renderMonthContent - Function to render month content.
 * @prop renderQuarterContent - Function to render quarter content.
 * @prop handleOnKeyDown - Function to handle key down events.
 * @prop handleOnMonthKeyDown - Function to handle key down events on a month.
 * @prop ariaLabelPrefix - Aria label prefix.
 * @prop chooseDayAriaLabelPrefix - Aria label prefix for choosing a day.
 * @prop disabledDayAriaLabelPrefix - Aria label prefix for disabled day.
 * @prop disabledKeyboardNavigation - Flag to disable keyboard navigation.
 * @prop day - The day.
 * @prop endDate - The end date.
 * @prop orderInDisplay - The order in display.
 * @prop excludeDates - Dates to exclude.
 * @prop excludeDateIntervals - Date intervals to exclude.
 * @prop fixedHeight - Flag to set fixed height.
 * @prop highlightDates - Dates to highlight.
 * @prop holidays - Holidays.
 * @prop includeDates - Dates to include.
 * @prop includeDateIntervals - Date intervals to include.
 * @prop inline - Flag to set inline.
 * @prop shouldFocusDayInline - Flag to set focus on day inline.
 * @prop locale - The locale.
 * @prop maxDate - The maximum date.
 * @prop minDate - The minimum date.
 * @prop usePointerEvent - Flag to use pointer event.
 * @prop peekNextMonth - Flag to peek next month.
 * @prop preSelection - The pre-selection.
 * @prop selected - The selected date.
 * @prop selectingDate - The selecting date.
 * @prop calendarStartDay - The calendar start day.
 * @prop selectsEnd - Flag to select end.
 * @prop selectsStart - Flag to select start.
 * @prop selectsRange - Flag to select range.
 * @prop selectsDisabledDaysInRange - Flag to select disabled days in range.
 * @prop selectsMultiple - Flag to select multiple.
 * @prop selectedDates - The selected dates.
 * @prop showWeekNumbers - Flag to show week numbers.
 * @prop startDate - The start date.
 * @prop shouldCloseOnSelect - Flag to close on select.
 * @prop showMonthYearPicker - Flag to show month year picker.
 * @prop showFullMonthYearPicker - Flag to show full month year picker.
 * @prop showTwoColumnMonthYearPicker - Flag to show two column month year picker.
 * @prop showFourColumnMonthYearPicker - Flag to show four column month year picker.
 * @prop showQuarterYearPicker - Flag to show quarter year picker.
 * @prop showWeekPicker - Flag to show week picker.
 * @prop isInputFocused - Flag to set input focus.
 * @prop weekAriaLabelPrefix - Aria label prefix for week.
 * @prop containerRef - The container reference.
 * @prop monthShowsDuplicateDaysEnd - Flag to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Flag to show duplicate days at the start of the month.
 *
 * @example
 * ```tsx
 * function App() {
 *  const handleDayClick = (date) => {
 *     console.log('Day clicked: ', date);
 *   };
 *
 *   const handleDayMouseEnter = (date) => {
 *     console.log('Mouse entered on day: ', date);
 *   };
 *
 *   return (
 *     <div>
 *       <Month
 *         day={new Date()}
 *         endDate={new Date()}
 *         onDayClick={handleDayClick}
 *         onDayMouseEnter={handleDayMouseEnter}
 *         disabledKeyboardNavigation={false}
 *         showWeekNumbers={true}
 *         showMonthYearPicker={false}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
var Month = /** @class */ (function (_super) {
  __extends(Month, _super);
  function Month() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.MONTH_REFS = __spreadArray([], Array(12), true).map(function () {
      return createRef();
    });
    _this.QUARTER_REFS = __spreadArray([], Array(4), true).map(function () {
      return createRef();
    });
    _this.isDisabled = function (day) {
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayDisabled(day, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
        includeDateIntervals: _this.props.includeDateIntervals,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.isExcluded = function (day) {
      // Almost all props previously were passed as this.props w/o proper typing with prop-types
      // after the migration to TS i made it explicit
      return isDayExcluded(day, {
        excludeDates: _this.props.excludeDates,
        excludeDateIntervals: _this.props.excludeDateIntervals,
      });
    };
    _this.handleDayClick = function (day, event) {
      var _a, _b;
      (_b = (_a = _this.props).onDayClick) === null || _b === void 0
        ? void 0
        : _b.call(_a, day, event, _this.props.orderInDisplay);
    };
    _this.handleDayMouseEnter = function (day) {
      var _a, _b;
      (_b = (_a = _this.props).onDayMouseEnter) === null || _b === void 0
        ? void 0
        : _b.call(_a, day);
    };
    _this.handleMouseLeave = function () {
      var _a, _b;
      (_b = (_a = _this.props).onMouseLeave) === null || _b === void 0
        ? void 0
        : _b.call(_a);
    };
    _this.isRangeStartMonth = function (m) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameMonth(setMonth(day, m), startDate);
    };
    _this.isRangeStartQuarter = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(setQuarter(day, q), startDate);
    };
    _this.isRangeEndMonth = function (m) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameMonth(setMonth(day, m), endDate);
    };
    _this.isRangeEndQuarter = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (!startDate || !endDate) {
        return false;
      }
      return isSameQuarter(setQuarter(day, q), endDate);
    };
    _this.isInSelectingRangeMonth = function (m) {
      var _a;
      var _b = _this.props,
        day = _b.day,
        selectsStart = _b.selectsStart,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange,
        startDate = _b.startDate,
        endDate = _b.endDate;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
        return false;
      }
      if (selectsStart && endDate) {
        return isMonthInRange(selectingDate, endDate, m, day);
      }
      if (selectsEnd && startDate) {
        return isMonthInRange(startDate, selectingDate, m, day);
      }
      if (selectsRange && startDate && !endDate) {
        return isMonthInRange(startDate, selectingDate, m, day);
      }
      return false;
    };
    _this.isSelectingMonthRangeStart = function (m) {
      var _a;
      if (!_this.isInSelectingRangeMonth(m)) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        startDate = _b.startDate,
        selectsStart = _b.selectsStart;
      var _month = setMonth(day, m);
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsStart) {
        return isSameMonth(_month, selectingDate);
      } else {
        return isSameMonth(_month, startDate);
      }
    };
    _this.isSelectingMonthRangeEnd = function (m) {
      var _a;
      if (!_this.isInSelectingRangeMonth(m)) {
        return false;
      }
      var _b = _this.props,
        day = _b.day,
        endDate = _b.endDate,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange;
      var _month = setMonth(day, m);
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (selectsEnd || selectsRange) {
        return isSameMonth(_month, selectingDate);
      } else {
        return isSameMonth(_month, endDate);
      }
    };
    _this.isInSelectingRangeQuarter = function (q) {
      var _a;
      var _b = _this.props,
        day = _b.day,
        selectsStart = _b.selectsStart,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange,
        startDate = _b.startDate,
        endDate = _b.endDate;
      var selectingDate =
        (_a = _this.props.selectingDate) !== null && _a !== void 0
          ? _a
          : _this.props.preSelection;
      if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
        return false;
      }
      if (selectsStart && endDate) {
        return isQuarterInRange(selectingDate, endDate, q, day);
      }
      if (selectsEnd && startDate) {
        return isQuarterInRange(startDate, selectingDate, q, day);
      }
      if (selectsRange && startDate && !endDate) {
        return isQuarterInRange(startDate, selectingDate, q, day);
      }
      return false;
    };
    _this.isWeekInMonth = function (startOfWeek) {
      var day = _this.props.day;
      var endOfWeek = addDays(startOfWeek, 6);
      return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
    };
    _this.isCurrentMonth = function (day, m) {
      return getYear(day) === getYear(newDate()) && m === getMonth(newDate());
    };
    _this.isCurrentQuarter = function (day, q) {
      return getYear(day) === getYear(newDate()) && q === getQuarter(newDate());
    };
    _this.isSelectedMonth = function (day, m, selected) {
      return getMonth(selected) === m && getYear(day) === getYear(selected);
    };
    _this.isSelectMonthInList = function (day, m, selectedDates) {
      return selectedDates.some(function (selectedDate) {
        return _this.isSelectedMonth(day, m, selectedDate);
      });
    };
    _this.isSelectedQuarter = function (day, q, selected) {
      return getQuarter(day) === q && getYear(day) === getYear(selected);
    };
    _this.renderWeeks = function () {
      var weeks = [];
      var isFixedHeight = _this.props.fixedHeight;
      var i = 0;
      var breakAfterNextPush = false;
      var currentWeekStart = getStartOfWeek(
        getStartOfMonth(_this.props.day),
        _this.props.locale,
        _this.props.calendarStartDay,
      );
      var isPreSelected = function (preSelection) {
        return _this.props.showWeekPicker
          ? getStartOfWeek(
              preSelection,
              _this.props.locale,
              _this.props.calendarStartDay,
            )
          : _this.props.preSelection;
      };
      var isSelected = function (selected) {
        return _this.props.showWeekPicker
          ? getStartOfWeek(
              selected,
              _this.props.locale,
              _this.props.calendarStartDay,
            )
          : _this.props.selected;
      };
      var selected = _this.props.selected
        ? isSelected(_this.props.selected)
        : undefined;
      var preSelection = _this.props.preSelection
        ? isPreSelected(_this.props.preSelection)
        : undefined;
      while (true) {
        weeks.push(
          React.createElement(
            Week,
            _assign({}, _this.props, {
              ariaLabelPrefix: _this.props.weekAriaLabelPrefix,
              key: i,
              day: currentWeekStart,
              month: getMonth(_this.props.day),
              onDayClick: _this.handleDayClick,
              onDayMouseEnter: _this.handleDayMouseEnter,
              selected: selected,
              preSelection: preSelection,
              showWeekNumber: _this.props.showWeekNumbers,
            }),
          ),
        );
        if (breakAfterNextPush) break;
        i++;
        currentWeekStart = addWeeks(currentWeekStart, 1);
        // If one of these conditions is true, we will either break on this week
        // or break on the next week
        var isFixedAndFinalWeek =
          isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
        var isNonFixedAndOutOfMonth =
          !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);
        if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
          if (_this.props.peekNextMonth) {
            breakAfterNextPush = true;
          } else {
            break;
          }
        }
      }
      return weeks;
    };
    _this.onMonthClick = function (event, m) {
      var _a = _this.isMonthDisabledForLabelDate(m),
        isDisabled = _a.isDisabled,
        labelDate = _a.labelDate;
      if (isDisabled) {
        return;
      }
      _this.handleDayClick(getStartOfMonth(labelDate), event);
    };
    _this.onMonthMouseEnter = function (m) {
      var _a = _this.isMonthDisabledForLabelDate(m),
        isDisabled = _a.isDisabled,
        labelDate = _a.labelDate;
      if (isDisabled) {
        return;
      }
      _this.handleDayMouseEnter(getStartOfMonth(labelDate));
    };
    _this.handleMonthNavigation = function (newMonth, newDate) {
      var _a, _b, _c, _d;
      (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
        ? void 0
        : _b.call(_a, newDate);
      (_d =
        (_c = _this.MONTH_REFS[newMonth]) === null || _c === void 0
          ? void 0
          : _c.current) === null || _d === void 0
        ? void 0
        : _d.focus();
    };
    _this.handleKeyboardNavigation = function (event, eventKey, month) {
      var _a;
      var _b = _this.props,
        selected = _b.selected,
        preSelection = _b.preSelection,
        setPreSelection = _b.setPreSelection,
        minDate = _b.minDate,
        maxDate = _b.maxDate,
        showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker,
        showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker;
      if (!preSelection) return;
      var monthColumnsLayout = getMonthColumnsLayout(
        showFourColumnMonthYearPicker,
        showTwoColumnMonthYearPicker,
      );
      var verticalOffset = _this.getVerticalOffset(monthColumnsLayout);
      var monthsGrid =
        (_a = MONTH_COLUMNS[monthColumnsLayout]) === null || _a === void 0
          ? void 0
          : _a.grid;
      var calculateNewDateAndMonth = function (eventKey, date, month) {
        var _a, _b;
        var newCalculatedDate = date;
        var newCalculatedMonth = month;
        switch (eventKey) {
          case KeyType.ArrowRight:
            newCalculatedDate = addMonths(
              date,
              MONTH_NAVIGATION_HORIZONTAL_OFFSET,
            );
            newCalculatedMonth =
              month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
            break;
          case KeyType.ArrowLeft:
            newCalculatedDate = subMonths(
              date,
              MONTH_NAVIGATION_HORIZONTAL_OFFSET,
            );
            newCalculatedMonth =
              month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
            break;
          case KeyType.ArrowUp:
            newCalculatedDate = subMonths(date, verticalOffset);
            newCalculatedMonth = (
              (_a =
                monthsGrid === null || monthsGrid === void 0
                  ? void 0
                  : monthsGrid[0]) === null || _a === void 0
                ? void 0
                : _a.includes(month)
            )
              ? month + 12 - verticalOffset
              : month - verticalOffset;
            break;
          case KeyType.ArrowDown:
            newCalculatedDate = addMonths(date, verticalOffset);
            newCalculatedMonth = (
              (_b =
                monthsGrid === null || monthsGrid === void 0
                  ? void 0
                  : monthsGrid[monthsGrid.length - 1]) === null || _b === void 0
                ? void 0
                : _b.includes(month)
            )
              ? month - 12 + verticalOffset
              : month + verticalOffset;
            break;
        }
        return {
          newCalculatedDate: newCalculatedDate,
          newCalculatedMonth: newCalculatedMonth,
        };
      };
      var getNewDateAndMonth = function (eventKey, selectedDate, month) {
        var MAX_ITERATIONS = 40;
        var eventKeyCopy = eventKey;
        var validDateFound = false;
        var iterations = 0;
        var _a = calculateNewDateAndMonth(eventKeyCopy, selectedDate, month),
          newCalculatedDate = _a.newCalculatedDate,
          newCalculatedMonth = _a.newCalculatedMonth;
        while (!validDateFound) {
          if (iterations >= MAX_ITERATIONS) {
            newCalculatedDate = selectedDate;
            newCalculatedMonth = month;
            break;
          }
          // if minDate exists and the new month is before the minimum month, it will try to find the next available month after
          if (minDate && newCalculatedDate < minDate) {
            eventKeyCopy = KeyType.ArrowRight;
            var obj = calculateNewDateAndMonth(
              eventKeyCopy,
              newCalculatedDate,
              newCalculatedMonth,
            );
            newCalculatedDate = obj.newCalculatedDate;
            newCalculatedMonth = obj.newCalculatedMonth;
          }
          // if maxDate exists and the new month is after the maximum month, it will try to find the next available month before
          if (maxDate && newCalculatedDate > maxDate) {
            eventKeyCopy = KeyType.ArrowLeft;
            var obj = calculateNewDateAndMonth(
              eventKeyCopy,
              newCalculatedDate,
              newCalculatedMonth,
            );
            newCalculatedDate = obj.newCalculatedDate;
            newCalculatedMonth = obj.newCalculatedMonth;
          }
          if (isMonthYearDisabled(newCalculatedDate, _this.props)) {
            var obj = calculateNewDateAndMonth(
              eventKeyCopy,
              newCalculatedDate,
              newCalculatedMonth,
            );
            newCalculatedDate = obj.newCalculatedDate;
            newCalculatedMonth = obj.newCalculatedMonth;
          } else {
            validDateFound = true;
          }
          iterations++;
        }
        return {
          newCalculatedDate: newCalculatedDate,
          newCalculatedMonth: newCalculatedMonth,
        };
      };
      if (eventKey === KeyType.Enter) {
        if (!_this.isMonthDisabled(month)) {
          _this.onMonthClick(event, month);
          setPreSelection === null || setPreSelection === void 0
            ? void 0
            : setPreSelection(selected);
        }
        return;
      }
      var _c = getNewDateAndMonth(eventKey, preSelection, month),
        newCalculatedDate = _c.newCalculatedDate,
        newCalculatedMonth = _c.newCalculatedMonth;
      switch (eventKey) {
        case KeyType.ArrowRight:
        case KeyType.ArrowLeft:
        case KeyType.ArrowUp:
        case KeyType.ArrowDown:
          _this.handleMonthNavigation(newCalculatedMonth, newCalculatedDate);
          break;
      }
    };
    _this.getVerticalOffset = function (monthColumnsLayout) {
      var _a, _b;
      return (_b =
        (_a = MONTH_COLUMNS[monthColumnsLayout]) === null || _a === void 0
          ? void 0
          : _a.verticalNavigationOffset) !== null && _b !== void 0
        ? _b
        : 0;
    };
    _this.onMonthKeyDown = function (event, month) {
      var _a = _this.props,
        disabledKeyboardNavigation = _a.disabledKeyboardNavigation,
        handleOnMonthKeyDown = _a.handleOnMonthKeyDown;
      var eventKey = event.key;
      if (eventKey !== KeyType.Tab) {
        // preventDefault on tab event blocks focus change
        event.preventDefault();
      }
      if (!disabledKeyboardNavigation) {
        _this.handleKeyboardNavigation(event, eventKey, month);
      }
      handleOnMonthKeyDown && handleOnMonthKeyDown(event);
    };
    _this.onQuarterClick = function (event, q) {
      var labelDate = setQuarter(_this.props.day, q);
      if (isQuarterDisabled(labelDate, _this.props)) {
        return;
      }
      _this.handleDayClick(getStartOfQuarter(labelDate), event);
    };
    _this.onQuarterMouseEnter = function (q) {
      var labelDate = setQuarter(_this.props.day, q);
      if (isQuarterDisabled(labelDate, _this.props)) {
        return;
      }
      _this.handleDayMouseEnter(getStartOfQuarter(labelDate));
    };
    _this.handleQuarterNavigation = function (newQuarter, newDate) {
      var _a, _b, _c, _d;
      if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) {
        return;
      }
      (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
        ? void 0
        : _b.call(_a, newDate);
      (_d =
        (_c = _this.QUARTER_REFS[newQuarter - 1]) === null || _c === void 0
          ? void 0
          : _c.current) === null || _d === void 0
        ? void 0
        : _d.focus();
    };
    _this.onQuarterKeyDown = function (event, quarter) {
      var _a, _b;
      var eventKey = event.key;
      if (!_this.props.disabledKeyboardNavigation) {
        switch (eventKey) {
          case KeyType.Enter:
            _this.onQuarterClick(event, quarter);
            (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
              ? void 0
              : _b.call(_a, _this.props.selected);
            break;
          case KeyType.ArrowRight:
            if (!_this.props.preSelection) {
              break;
            }
            _this.handleQuarterNavigation(
              quarter === 4 ? 1 : quarter + 1,
              addQuarters(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowLeft:
            if (!_this.props.preSelection) {
              break;
            }
            _this.handleQuarterNavigation(
              quarter === 1 ? 4 : quarter - 1,
              subQuarters(_this.props.preSelection, 1),
            );
            break;
        }
      }
    };
    _this.isMonthDisabledForLabelDate = function (month) {
      var _a;
      var _b = _this.props,
        day = _b.day,
        minDate = _b.minDate,
        maxDate = _b.maxDate,
        excludeDates = _b.excludeDates,
        includeDates = _b.includeDates;
      var labelDate = setMonth(day, month);
      return {
        isDisabled:
          (_a =
            (minDate || maxDate || excludeDates || includeDates) &&
            isMonthDisabled(labelDate, _this.props)) !== null && _a !== void 0
            ? _a
            : false,
        labelDate: labelDate,
      };
    };
    _this.isMonthDisabled = function (month) {
      var isDisabled = _this.isMonthDisabledForLabelDate(month).isDisabled;
      return isDisabled;
    };
    _this.getMonthClassNames = function (m) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate,
        preSelection = _a.preSelection,
        monthClassName = _a.monthClassName;
      var _monthClassName = monthClassName
        ? monthClassName(setMonth(day, m))
        : undefined;
      var selection = _this.getSelection();
      return clsx(
        "react-datepicker__month-text",
        "react-datepicker__month-".concat(m),
        _monthClassName,
        {
          "react-datepicker__month-text--disabled": _this.isMonthDisabled(m),
          "react-datepicker__month-text--selected": selection
            ? _this.isSelectMonthInList(day, m, selection)
            : undefined,
          "react-datepicker__month-text--keyboard-selected":
            !_this.props.disabledKeyboardNavigation &&
            preSelection &&
            _this.isSelectedMonth(day, m, preSelection) &&
            !_this.isMonthDisabled(m),
          "react-datepicker__month-text--in-selecting-range":
            _this.isInSelectingRangeMonth(m),
          "react-datepicker__month-text--in-range":
            startDate && endDate
              ? isMonthInRange(startDate, endDate, m, day)
              : undefined,
          "react-datepicker__month-text--range-start":
            _this.isRangeStartMonth(m),
          "react-datepicker__month-text--range-end": _this.isRangeEndMonth(m),
          "react-datepicker__month-text--selecting-range-start":
            _this.isSelectingMonthRangeStart(m),
          "react-datepicker__month-text--selecting-range-end":
            _this.isSelectingMonthRangeEnd(m),
          "react-datepicker__month-text--today": _this.isCurrentMonth(day, m),
        },
      );
    };
    _this.getTabIndex = function (m) {
      if (_this.props.preSelection == null) {
        return "-1";
      }
      var preSelectedMonth = getMonth(_this.props.preSelection);
      var isPreSelectedMonthDisabled =
        _this.isMonthDisabledForLabelDate(preSelectedMonth).isDisabled;
      var tabIndex =
        m === preSelectedMonth &&
        !(isPreSelectedMonthDisabled || _this.props.disabledKeyboardNavigation)
          ? "0"
          : "-1";
      return tabIndex;
    };
    _this.getQuarterTabIndex = function (q) {
      if (_this.props.preSelection == null) {
        return "-1";
      }
      var preSelectedQuarter = getQuarter(_this.props.preSelection);
      var isCurrentQuarterDisabled = isQuarterDisabled(
        _this.props.day,
        _this.props,
      );
      var tabIndex =
        q === preSelectedQuarter &&
        !(isCurrentQuarterDisabled || _this.props.disabledKeyboardNavigation)
          ? "0"
          : "-1";
      return tabIndex;
    };
    _this.getAriaLabel = function (month) {
      var _a = _this.props,
        _b = _a.chooseDayAriaLabelPrefix,
        chooseDayAriaLabelPrefix = _b === void 0 ? "Choose" : _b,
        _c = _a.disabledDayAriaLabelPrefix,
        disabledDayAriaLabelPrefix = _c === void 0 ? "Not available" : _c,
        day = _a.day,
        locale = _a.locale;
      var labelDate = setMonth(day, month);
      var prefix =
        _this.isDisabled(labelDate) || _this.isExcluded(labelDate)
          ? disabledDayAriaLabelPrefix
          : chooseDayAriaLabelPrefix;
      return ""
        .concat(prefix, " ")
        .concat(formatDate(labelDate, "MMMM yyyy", locale));
    };
    _this.getQuarterClassNames = function (q) {
      var _a = _this.props,
        day = _a.day,
        startDate = _a.startDate,
        endDate = _a.endDate,
        selected = _a.selected,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        excludeDates = _a.excludeDates,
        includeDates = _a.includeDates,
        filterDate = _a.filterDate,
        preSelection = _a.preSelection,
        disabledKeyboardNavigation = _a.disabledKeyboardNavigation;
      var isDisabled =
        (minDate || maxDate || excludeDates || includeDates || filterDate) &&
        isQuarterDisabled(setQuarter(day, q), _this.props);
      return clsx(
        "react-datepicker__quarter-text",
        "react-datepicker__quarter-".concat(q),
        {
          "react-datepicker__quarter-text--disabled": isDisabled,
          "react-datepicker__quarter-text--selected": selected
            ? _this.isSelectedQuarter(day, q, selected)
            : undefined,
          "react-datepicker__quarter-text--keyboard-selected":
            !disabledKeyboardNavigation &&
            preSelection &&
            _this.isSelectedQuarter(day, q, preSelection) &&
            !isDisabled,
          "react-datepicker__quarter-text--in-selecting-range":
            _this.isInSelectingRangeQuarter(q),
          "react-datepicker__quarter-text--in-range":
            startDate && endDate
              ? isQuarterInRange(startDate, endDate, q, day)
              : undefined,
          "react-datepicker__quarter-text--range-start":
            _this.isRangeStartQuarter(q),
          "react-datepicker__quarter-text--range-end":
            _this.isRangeEndQuarter(q),
          "react-datepicker__quarter-text--today": _this.isCurrentQuarter(
            day,
            q,
          ),
        },
      );
    };
    _this.getMonthContent = function (m) {
      var _a = _this.props,
        showFullMonthYearPicker = _a.showFullMonthYearPicker,
        renderMonthContent = _a.renderMonthContent,
        locale = _a.locale,
        day = _a.day;
      var shortMonthText = getMonthShortInLocale(m, locale);
      var fullMonthText = getMonthInLocale(m, locale);
      if (renderMonthContent) {
        return renderMonthContent(m, shortMonthText, fullMonthText, day);
      }
      return showFullMonthYearPicker ? fullMonthText : shortMonthText;
    };
    _this.getQuarterContent = function (q) {
      var _a;
      var _b = _this.props,
        renderQuarterContent = _b.renderQuarterContent,
        locale = _b.locale;
      var shortQuarter = getQuarterShortInLocale(q, locale);
      return (_a =
        renderQuarterContent === null || renderQuarterContent === void 0
          ? void 0
          : renderQuarterContent(q, shortQuarter)) !== null && _a !== void 0
        ? _a
        : shortQuarter;
    };
    _this.renderMonths = function () {
      var _a;
      var _b = _this.props,
        showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker,
        showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker,
        day = _b.day,
        selected = _b.selected;
      var monthColumns =
        (_a =
          MONTH_COLUMNS[
            getMonthColumnsLayout(
              showFourColumnMonthYearPicker,
              showTwoColumnMonthYearPicker,
            )
          ]) === null || _a === void 0
          ? void 0
          : _a.grid;
      return monthColumns === null || monthColumns === void 0
        ? void 0
        : monthColumns.map(function (month, i) {
            return React.createElement(
              "div",
              { className: "react-datepicker__month-wrapper", key: i },
              month.map(function (m, j) {
                return React.createElement(
                  "div",
                  {
                    ref: _this.MONTH_REFS[m],
                    key: j,
                    onClick: function (event) {
                      _this.onMonthClick(event, m);
                    },
                    onKeyDown: function (event) {
                      if (isSpaceKeyDown(event)) {
                        event.preventDefault();
                        event.key = KeyType.Enter;
                      }
                      _this.onMonthKeyDown(event, m);
                    },
                    onMouseEnter: !_this.props.usePointerEvent
                      ? function () {
                          return _this.onMonthMouseEnter(m);
                        }
                      : undefined,
                    onPointerEnter: _this.props.usePointerEvent
                      ? function () {
                          return _this.onMonthMouseEnter(m);
                        }
                      : undefined,
                    tabIndex: Number(_this.getTabIndex(m)),
                    className: _this.getMonthClassNames(m),
                    "aria-disabled": _this.isMonthDisabled(m),
                    role: "option",
                    "aria-label": _this.getAriaLabel(m),
                    "aria-current": _this.isCurrentMonth(day, m)
                      ? "date"
                      : undefined,
                    "aria-selected": selected
                      ? _this.isSelectedMonth(day, m, selected)
                      : undefined,
                  },
                  _this.getMonthContent(m),
                );
              }),
            );
          });
    };
    _this.renderQuarters = function () {
      var _a = _this.props,
        day = _a.day,
        selected = _a.selected;
      var quarters = [1, 2, 3, 4];
      return React.createElement(
        "div",
        { className: "react-datepicker__quarter-wrapper" },
        quarters.map(function (q, j) {
          return React.createElement(
            "div",
            {
              key: j,
              ref: _this.QUARTER_REFS[j],
              role: "option",
              onClick: function (event) {
                _this.onQuarterClick(event, q);
              },
              onKeyDown: function (event) {
                _this.onQuarterKeyDown(event, q);
              },
              onMouseEnter: !_this.props.usePointerEvent
                ? function () {
                    return _this.onQuarterMouseEnter(q);
                  }
                : undefined,
              onPointerEnter: _this.props.usePointerEvent
                ? function () {
                    return _this.onQuarterMouseEnter(q);
                  }
                : undefined,
              className: _this.getQuarterClassNames(q),
              "aria-selected": selected
                ? _this.isSelectedQuarter(day, q, selected)
                : undefined,
              tabIndex: Number(_this.getQuarterTabIndex(q)),
              "aria-current": _this.isCurrentQuarter(day, q)
                ? "date"
                : undefined,
            },
            _this.getQuarterContent(q),
          );
        }),
      );
    };
    _this.getClassNames = function () {
      var _a = _this.props,
        selectingDate = _a.selectingDate,
        selectsStart = _a.selectsStart,
        selectsEnd = _a.selectsEnd,
        showMonthYearPicker = _a.showMonthYearPicker,
        showQuarterYearPicker = _a.showQuarterYearPicker,
        showWeekPicker = _a.showWeekPicker;
      return clsx(
        "react-datepicker__month",
        {
          "react-datepicker__month--selecting-range":
            selectingDate && (selectsStart || selectsEnd),
        },
        { "react-datepicker__monthPicker": showMonthYearPicker },
        { "react-datepicker__quarterPicker": showQuarterYearPicker },
        { "react-datepicker__weekPicker": showWeekPicker },
      );
    };
    return _this;
  }
  Month.prototype.getSelection = function () {
    var _a = this.props,
      selected = _a.selected,
      selectedDates = _a.selectedDates,
      selectsMultiple = _a.selectsMultiple;
    if (selectsMultiple) {
      return selectedDates;
    }
    if (selected) {
      return [selected];
    }
    return undefined;
  };
  Month.prototype.render = function () {
    var _a = this.props,
      showMonthYearPicker = _a.showMonthYearPicker,
      showQuarterYearPicker = _a.showQuarterYearPicker,
      day = _a.day,
      _b = _a.ariaLabelPrefix,
      ariaLabelPrefix = _b === void 0 ? "Month " : _b;
    var formattedAriaLabelPrefix = ariaLabelPrefix
      ? ariaLabelPrefix.trim() + " "
      : "";
    return React.createElement(
      "div",
      {
        className: this.getClassNames(),
        onMouseLeave: !this.props.usePointerEvent
          ? this.handleMouseLeave
          : undefined,
        onPointerLeave: this.props.usePointerEvent
          ? this.handleMouseLeave
          : undefined,
        "aria-label": ""
          .concat(formattedAriaLabelPrefix)
          .concat(formatDate(day, "MMMM, yyyy", this.props.locale)),
        role: "listbox",
      },
      showMonthYearPicker
        ? this.renderMonths()
        : showQuarterYearPicker
          ? this.renderQuarters()
          : this.renderWeeks(),
    );
  };
  return Month;
})(Component);

var MonthDropdownOptions = /** @class */ (function (_super) {
  __extends(MonthDropdownOptions, _super);
  function MonthDropdownOptions() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.isSelectedMonth = function (i) {
      return _this.props.month === i;
    };
    _this.renderOptions = function () {
      return _this.props.monthNames.map(function (month, i) {
        return React.createElement(
          "div",
          {
            className: _this.isSelectedMonth(i)
              ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
              : "react-datepicker__month-option",
            key: month,
            onClick: _this.onChange.bind(_this, i),
            "aria-selected": _this.isSelectedMonth(i) ? "true" : undefined,
          },
          _this.isSelectedMonth(i)
            ? React.createElement(
                "span",
                { className: "react-datepicker__month-option--selected" },
                "\u2713",
              )
            : "",
          month,
        );
      });
    };
    _this.onChange = function (month) {
      return _this.props.onChange(month);
    };
    _this.handleClickOutside = function () {
      return _this.props.onCancel();
    };
    return _this;
  }
  MonthDropdownOptions.prototype.render = function () {
    return React.createElement(
      ClickOutsideWrapper,
      {
        className: "react-datepicker__month-dropdown",
        onClickOutside: this.handleClickOutside,
      },
      this.renderOptions(),
    );
  };
  return MonthDropdownOptions;
})(Component);

var MonthDropdown = /** @class */ (function (_super) {
  __extends(MonthDropdown, _super);
  function MonthDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function (monthNames) {
      return monthNames.map(function (m, i) {
        return React.createElement("option", { key: m, value: i }, m);
      });
    };
    _this.renderSelectMode = function (monthNames) {
      return React.createElement(
        "select",
        {
          value: _this.props.month,
          className: "react-datepicker__month-select",
          onChange: function (e) {
            return _this.onChange(parseInt(e.target.value));
          },
        },
        _this.renderSelectOptions(monthNames),
      );
    };
    _this.renderReadView = function (visible, monthNames) {
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-read-view",
          onClick: _this.toggleDropdown,
        },
        React.createElement("span", {
          className: "react-datepicker__month-read-view--down-arrow",
        }),
        React.createElement(
          "span",
          { className: "react-datepicker__month-read-view--selected-month" },
          monthNames[_this.props.month],
        ),
      );
    };
    _this.renderDropdown = function (monthNames) {
      return React.createElement(
        MonthDropdownOptions,
        _assign({ key: "dropdown" }, _this.props, {
          monthNames: monthNames,
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
        }),
      );
    };
    _this.renderScrollMode = function (monthNames) {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible, monthNames)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown(monthNames));
      }
      return result;
    };
    _this.onChange = function (month) {
      _this.toggleDropdown();
      if (month !== _this.props.month) {
        _this.props.onChange(month);
      }
    };
    _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible,
      });
    };
    return _this;
  }
  MonthDropdown.prototype.render = function () {
    var _this = this;
    var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
      this.props.useShortMonthInDropdown
        ? function (m) {
            return getMonthShortInLocale(m, _this.props.locale);
          }
        : function (m) {
            return getMonthInLocale(m, _this.props.locale);
          },
    );
    var renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode(monthNames);
        break;
      case "select":
        renderedDropdown = this.renderSelectMode(monthNames);
        break;
    }
    return React.createElement(
      "div",
      {
        className:
          "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(
            this.props.dropdownMode,
          ),
      },
      renderedDropdown,
    );
  };
  return MonthDropdown;
})(Component);

function generateMonthYears(minDate, maxDate) {
  var list = [];
  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);
  while (!isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));
    currDate = addMonths(currDate, 1);
  }
  return list;
}
var MonthYearDropdownOptions = /** @class */ (function (_super) {
  __extends(MonthYearDropdownOptions, _super);
  function MonthYearDropdownOptions(props) {
    var _this = _super.call(this, props) || this;
    _this.renderOptions = function () {
      return _this.state.monthYearsList.map(function (monthYear) {
        var monthYearPoint = getTime(monthYear);
        var isSameMonthYear =
          isSameYear(_this.props.date, monthYear) &&
          isSameMonth(_this.props.date, monthYear);
        return React.createElement(
          "div",
          {
            className: isSameMonthYear
              ? "react-datepicker__month-year-option--selected_month-year"
              : "react-datepicker__month-year-option",
            key: monthYearPoint,
            onClick: _this.onChange.bind(_this, monthYearPoint),
            "aria-selected": isSameMonthYear ? "true" : undefined,
          },
          isSameMonthYear
            ? React.createElement(
                "span",
                { className: "react-datepicker__month-year-option--selected" },
                "\u2713",
              )
            : "",
          formatDate(monthYear, _this.props.dateFormat, _this.props.locale),
        );
      });
    };
    _this.onChange = function (monthYear) {
      return _this.props.onChange(monthYear);
    };
    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };
    _this.state = {
      monthYearsList: generateMonthYears(
        _this.props.minDate,
        _this.props.maxDate,
      ),
    };
    return _this;
  }
  MonthYearDropdownOptions.prototype.render = function () {
    var dropdownClass = clsx({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable":
        this.props.scrollableMonthYearDropdown,
    });
    return React.createElement(
      ClickOutsideWrapper,
      { className: dropdownClass, onClickOutside: this.handleClickOutside },
      this.renderOptions(),
    );
  };
  return MonthYearDropdownOptions;
})(Component);

var MonthYearDropdown = /** @class */ (function (_super) {
  __extends(MonthYearDropdown, _super);
  function MonthYearDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function () {
      var currDate = getStartOfMonth(_this.props.minDate);
      var lastDate = getStartOfMonth(_this.props.maxDate);
      var options = [];
      while (!isAfter(currDate, lastDate)) {
        var timePoint = getTime(currDate);
        options.push(
          React.createElement(
            "option",
            { key: timePoint, value: timePoint },
            formatDate(currDate, _this.props.dateFormat, _this.props.locale),
          ),
        );
        currDate = addMonths(currDate, 1);
      }
      return options;
    };
    _this.onSelectChange = function (event) {
      _this.onChange(parseInt(event.target.value));
    };
    _this.renderSelectMode = function () {
      return React.createElement(
        "select",
        {
          value: getTime(getStartOfMonth(_this.props.date)),
          className: "react-datepicker__month-year-select",
          onChange: _this.onSelectChange,
        },
        _this.renderSelectOptions(),
      );
    };
    _this.renderReadView = function (visible) {
      var yearMonth = formatDate(
        _this.props.date,
        _this.props.dateFormat,
        _this.props.locale,
      );
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-year-read-view",
          onClick: _this.toggleDropdown,
        },
        React.createElement("span", {
          className: "react-datepicker__month-year-read-view--down-arrow",
        }),
        React.createElement(
          "span",
          {
            className:
              "react-datepicker__month-year-read-view--selected-month-year",
          },
          yearMonth,
        ),
      );
    };
    _this.renderDropdown = function () {
      return React.createElement(
        MonthYearDropdownOptions,
        _assign({ key: "dropdown" }, _this.props, {
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
        }),
      );
    };
    _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    };
    _this.onChange = function (monthYearPoint) {
      _this.toggleDropdown();
      var changedDate = newDate(monthYearPoint);
      if (
        isSameYear(_this.props.date, changedDate) &&
        isSameMonth(_this.props.date, changedDate)
      ) {
        return;
      }
      _this.props.onChange(changedDate);
    };
    _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible,
      });
    };
    return _this;
  }
  MonthYearDropdown.prototype.render = function () {
    var renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }
    return React.createElement(
      "div",
      {
        className:
          "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(
            this.props.dropdownMode,
          ),
      },
      renderedDropdown,
    );
  };
  return MonthYearDropdown;
})(Component);

var Time = /** @class */ (function (_super) {
  __extends(Time, _super);
  function Time() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      height: null,
    };
    _this.scrollToTheSelectedTime = function () {
      requestAnimationFrame(function () {
        var _a, _b, _c;
        if (!_this.list) return;
        _this.list.scrollTop =
          (_c =
            _this.centerLi &&
            Time.calcCenterPosition(
              _this.props.monthRef
                ? _this.props.monthRef.clientHeight -
                    ((_b =
                      (_a = _this.header) === null || _a === void 0
                        ? void 0
                        : _a.clientHeight) !== null && _b !== void 0
                      ? _b
                      : 0)
                : _this.list.clientHeight,
              _this.centerLi,
            )) !== null && _c !== void 0
            ? _c
            : 0;
      });
    };
    _this.handleClick = function (time) {
      var _a, _b;
      if (
        ((_this.props.minTime || _this.props.maxTime) &&
          isTimeInDisabledRange(time, _this.props)) ||
        ((_this.props.excludeTimes ||
          _this.props.includeTimes ||
          _this.props.filterTime) &&
          isTimeDisabled(time, _this.props))
      ) {
        return;
      }
      (_b = (_a = _this.props).onChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, time);
    };
    _this.isSelectedTime = function (time) {
      return _this.props.selected && isSameMinute(_this.props.selected, time);
    };
    _this.isDisabledTime = function (time) {
      return (
        ((_this.props.minTime || _this.props.maxTime) &&
          isTimeInDisabledRange(time, _this.props)) ||
        ((_this.props.excludeTimes ||
          _this.props.includeTimes ||
          _this.props.filterTime) &&
          isTimeDisabled(time, _this.props))
      );
    };
    _this.liClasses = function (time) {
      var _a;
      var classes = [
        "react-datepicker__time-list-item",
        _this.props.timeClassName ? _this.props.timeClassName(time) : undefined,
      ];
      if (_this.isSelectedTime(time)) {
        classes.push("react-datepicker__time-list-item--selected");
      }
      if (_this.isDisabledTime(time)) {
        classes.push("react-datepicker__time-list-item--disabled");
      }
      //convert this.props.intervals and the relevant time to seconds and check if it it's a clean multiple of the interval
      if (
        _this.props.injectTimes &&
        (getHours(time) * 3600 + getMinutes(time) * 60 + getSeconds(time)) %
          (((_a = _this.props.intervals) !== null && _a !== void 0
            ? _a
            : Time.defaultProps.intervals) *
            60) !==
          0
      ) {
        classes.push("react-datepicker__time-list-item--injected");
      }
      return classes.join(" ");
    };
    _this.handleOnKeyDown = function (event, time) {
      var _a, _b;
      if (event.key === KeyType.Space) {
        event.preventDefault();
        event.key = KeyType.Enter;
      }
      if (
        (event.key === KeyType.ArrowUp || event.key === KeyType.ArrowLeft) &&
        event.target instanceof HTMLElement &&
        event.target.previousSibling
      ) {
        event.preventDefault();
        event.target.previousSibling instanceof HTMLElement &&
          event.target.previousSibling.focus();
      }
      if (
        (event.key === KeyType.ArrowDown || event.key === KeyType.ArrowRight) &&
        event.target instanceof HTMLElement &&
        event.target.nextSibling
      ) {
        event.preventDefault();
        event.target.nextSibling instanceof HTMLElement &&
          event.target.nextSibling.focus();
      }
      if (event.key === KeyType.Enter) {
        _this.handleClick(time);
      }
      (_b = (_a = _this.props).handleOnKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
    };
    _this.renderTimes = function () {
      var _a;
      var times = [];
      var format =
        typeof _this.props.format === "string" ? _this.props.format : "p";
      var intervals =
        (_a = _this.props.intervals) !== null && _a !== void 0
          ? _a
          : Time.defaultProps.intervals;
      var activeDate =
        _this.props.selected || _this.props.openToDate || newDate();
      var base = getStartOfDay(activeDate);
      var sortedInjectTimes =
        _this.props.injectTimes &&
        _this.props.injectTimes.sort(function (a, b) {
          return a.getTime() - b.getTime();
        });
      var minutesInDay = 60 * getHoursInDay(activeDate);
      var multiplier = minutesInDay / intervals;
      for (var i = 0; i < multiplier; i++) {
        var currentTime = addMinutes(base, i * intervals);
        times.push(currentTime);
        if (sortedInjectTimes) {
          var timesToInject = timesToInjectAfter(
            base,
            currentTime,
            i,
            intervals,
            sortedInjectTimes,
          );
          times = times.concat(timesToInject);
        }
      }
      // Determine which time to focus and scroll into view when component mounts
      var timeToFocus = times.reduce(function (prev, time) {
        if (time.getTime() <= activeDate.getTime()) {
          return time;
        }
        return prev;
      }, times[0]);
      return times.map(function (time) {
        return React.createElement(
          "li",
          {
            key: time.valueOf(),
            onClick: _this.handleClick.bind(_this, time),
            className: _this.liClasses(time),
            ref: function (li) {
              if (time === timeToFocus) {
                _this.centerLi = li;
              }
            },
            onKeyDown: function (event) {
              _this.handleOnKeyDown(event, time);
            },
            tabIndex: time === timeToFocus ? 0 : -1,
            role: "option",
            "aria-selected": _this.isSelectedTime(time) ? "true" : undefined,
            "aria-disabled": _this.isDisabledTime(time) ? "true" : undefined,
          },
          formatDate(time, format, _this.props.locale),
        );
      });
    };
    _this.renderTimeCaption = function () {
      if (_this.props.showTimeCaption === false) {
        return React.createElement(React.Fragment, null);
      }
      return React.createElement(
        "div",
        {
          className:
            "react-datepicker__header react-datepicker__header--time ".concat(
              _this.props.showTimeSelectOnly
                ? "react-datepicker__header--time--only"
                : "",
            ),
          ref: function (header) {
            _this.header = header;
          },
        },
        React.createElement(
          "div",
          { className: "react-datepicker-time__header" },
          _this.props.timeCaption,
        ),
      );
    };
    return _this;
  }
  Object.defineProperty(Time, "defaultProps", {
    get: function () {
      return {
        intervals: 30,
        todayButton: null,
        timeCaption: "Time",
        showTimeCaption: true,
      };
    },
    enumerable: false,
    configurable: true,
  });
  Time.prototype.componentDidMount = function () {
    // code to ensure selected time will always be in focus within time window when it first appears
    this.scrollToTheSelectedTime();
    this.observeDatePickerHeightChanges();
  };
  Time.prototype.componentWillUnmount = function () {
    var _a;
    (_a = this.resizeObserver) === null || _a === void 0
      ? void 0
      : _a.disconnect();
  };
  Time.prototype.observeDatePickerHeightChanges = function () {
    var _this = this;
    var monthRef = this.props.monthRef;
    this.updateContainerHeight();
    if (monthRef) {
      this.resizeObserver = new ResizeObserver(function () {
        _this.updateContainerHeight();
      });
      this.resizeObserver.observe(monthRef);
    }
  };
  Time.prototype.updateContainerHeight = function () {
    if (this.props.monthRef && this.header) {
      this.setState({
        height: this.props.monthRef.clientHeight - this.header.clientHeight,
      });
    }
  };
  Time.prototype.render = function () {
    var _this = this;
    var _a;
    var height = this.state.height;
    return React.createElement(
      "div",
      {
        className: "react-datepicker__time-container ".concat(
          (
            (_a = this.props.todayButton) !== null && _a !== void 0
              ? _a
              : Time.defaultProps.todayButton
          )
            ? "react-datepicker__time-container--with-today-button"
            : "",
        ),
      },
      this.renderTimeCaption(),
      React.createElement(
        "div",
        { className: "react-datepicker__time" },
        React.createElement(
          "div",
          { className: "react-datepicker__time-box" },
          React.createElement(
            "ul",
            {
              className: "react-datepicker__time-list",
              ref: function (list) {
                _this.list = list;
              },
              style: height ? { height: height } : {},
              role: "listbox",
              "aria-label": this.props.timeCaption,
            },
            this.renderTimes(),
          ),
        ),
      ),
    );
  };
  Time.calcCenterPosition = function (listHeight, centerLiRef) {
    return (
      centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2)
    );
  };
  return Time;
})(Component);

var VERTICAL_NAVIGATION_OFFSET = 3;
/**
 * `Year` is a component that represents a year in a date picker.
 *
 * @class
 * @param {YearProps} props - The properties that define the `Year` component.
 * @property {VoidFunction} [props.clearSelectingDate] - Function to clear the selected date.
 * @property {Date} [props.date] - The currently selected date.
 * @property {boolean} [props.disabledKeyboardNavigation] - If true, keyboard navigation is disabled.
 * @property {Date} [props.endDate] - The end date in a range selection.
 * @property {(date: Date) => void} props.onDayClick - Function to handle day click events.
 * @property {Date} props.preSelection - The date that is currently in focus.
 * @property {(date: Date) => void} props.setPreSelection - Function to set the pre-selected date.
 * @property {{ [key: string]: any }} props.selected - The selected date(s).
 * @property {boolean} props.inline - If true, the date picker is displayed inline.
 * @property {Date} props.maxDate - The maximum selectable date.
 * @property {Date} props.minDate - The minimum selectable date.
 * @property {boolean} props.usePointerEvent - If true, pointer events are used instead of mouse events.
 * @property {(date: Date) => void} props.onYearMouseEnter - Function to handle mouse enter events on a year.
 * @property {(date: Date) => void} props.onYearMouseLeave - Function to handle mouse leave events on a year.
 */
var Year = /** @class */ (function (_super) {
  __extends(Year, _super);
  function Year(props) {
    var _this = _super.call(this, props) || this;
    _this.YEAR_REFS = __spreadArray(
      [],
      Array(_this.props.yearItemNumber),
      true,
    ).map(function () {
      return createRef();
    });
    _this.isDisabled = function (date) {
      return isDayDisabled(date, {
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
      });
    };
    _this.isExcluded = function (date) {
      return isDayExcluded(date, {
        excludeDates: _this.props.excludeDates,
      });
    };
    _this.selectingDate = function () {
      var _a;
      return (_a = _this.props.selectingDate) !== null && _a !== void 0
        ? _a
        : _this.props.preSelection;
    };
    _this.updateFocusOnPaginate = function (refIndex) {
      var waitForReRender = function () {
        var _a, _b;
        (_b =
          (_a = _this.YEAR_REFS[refIndex]) === null || _a === void 0
            ? void 0
            : _a.current) === null || _b === void 0
          ? void 0
          : _b.focus();
      };
      window.requestAnimationFrame(waitForReRender);
    };
    _this.handleYearClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    };
    _this.handleYearNavigation = function (newYear, newDate) {
      var _a, _b, _c, _d;
      var _e = _this.props,
        date = _e.date,
        yearItemNumber = _e.yearItemNumber;
      if (date === undefined || yearItemNumber === undefined) {
        return;
      }
      var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
      if (_this.isDisabled(newDate) || _this.isExcluded(newDate)) {
        return;
      }
      (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
        ? void 0
        : _b.call(_a, newDate);
      if (newYear - startPeriod < 0) {
        _this.updateFocusOnPaginate(yearItemNumber - (startPeriod - newYear));
      } else if (newYear - startPeriod >= yearItemNumber) {
        _this.updateFocusOnPaginate(
          Math.abs(yearItemNumber - (newYear - startPeriod)),
        );
      } else
        (_d =
          (_c = _this.YEAR_REFS[newYear - startPeriod]) === null ||
          _c === void 0
            ? void 0
            : _c.current) === null || _d === void 0
          ? void 0
          : _d.focus();
    };
    _this.isSameDay = function (y, other) {
      return isSameDay(y, other);
    };
    _this.isCurrentYear = function (y) {
      return y === getYear(newDate());
    };
    _this.isRangeStart = function (y) {
      return (
        _this.props.startDate &&
        _this.props.endDate &&
        isSameYear(setYear(newDate(), y), _this.props.startDate)
      );
    };
    _this.isRangeEnd = function (y) {
      return (
        _this.props.startDate &&
        _this.props.endDate &&
        isSameYear(setYear(newDate(), y), _this.props.endDate)
      );
    };
    _this.isInRange = function (y) {
      return isYearInRange(y, _this.props.startDate, _this.props.endDate);
    };
    _this.isInSelectingRange = function (y) {
      var _a = _this.props,
        selectsStart = _a.selectsStart,
        selectsEnd = _a.selectsEnd,
        selectsRange = _a.selectsRange,
        startDate = _a.startDate,
        endDate = _a.endDate;
      if (
        !(selectsStart || selectsEnd || selectsRange) ||
        !_this.selectingDate()
      ) {
        return false;
      }
      if (selectsStart && endDate) {
        return isYearInRange(y, _this.selectingDate(), endDate);
      }
      if (selectsEnd && startDate) {
        return isYearInRange(y, startDate, _this.selectingDate());
      }
      if (selectsRange && startDate && !endDate) {
        return isYearInRange(y, startDate, _this.selectingDate());
      }
      return false;
    };
    _this.isSelectingRangeStart = function (y) {
      var _a;
      if (!_this.isInSelectingRange(y)) {
        return false;
      }
      var _b = _this.props,
        startDate = _b.startDate,
        selectsStart = _b.selectsStart;
      var _year = setYear(newDate(), y);
      if (selectsStart) {
        return isSameYear(
          _year,
          (_a = _this.selectingDate()) !== null && _a !== void 0 ? _a : null,
        );
      }
      return isSameYear(
        _year,
        startDate !== null && startDate !== void 0 ? startDate : null,
      );
    };
    _this.isSelectingRangeEnd = function (y) {
      var _a;
      if (!_this.isInSelectingRange(y)) {
        return false;
      }
      var _b = _this.props,
        endDate = _b.endDate,
        selectsEnd = _b.selectsEnd,
        selectsRange = _b.selectsRange;
      var _year = setYear(newDate(), y);
      if (selectsEnd || selectsRange) {
        return isSameYear(
          _year,
          (_a = _this.selectingDate()) !== null && _a !== void 0 ? _a : null,
        );
      }
      return isSameYear(
        _year,
        endDate !== null && endDate !== void 0 ? endDate : null,
      );
    };
    _this.isKeyboardSelected = function (y) {
      if (
        _this.props.date === undefined ||
        _this.props.selected == null ||
        _this.props.preSelection == null
      ) {
        return;
      }
      var _a = _this.props,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        excludeDates = _a.excludeDates,
        includeDates = _a.includeDates,
        filterDate = _a.filterDate;
      var date = getStartOfYear(setYear(_this.props.date, y));
      var isDisabled =
        (minDate || maxDate || excludeDates || includeDates || filterDate) &&
        isYearDisabled(y, _this.props);
      return (
        !_this.props.disabledKeyboardNavigation &&
        !_this.props.inline &&
        !isSameDay(date, getStartOfYear(_this.props.selected)) &&
        isSameDay(date, getStartOfYear(_this.props.preSelection)) &&
        !isDisabled
      );
    };
    _this.isSelectedYear = function (year) {
      var _a = _this.props,
        selectsMultiple = _a.selectsMultiple,
        selected = _a.selected,
        selectedDates = _a.selectedDates;
      if (selectsMultiple) {
        return selectedDates === null || selectedDates === void 0
          ? void 0
          : selectedDates.some(function (date) {
              return year === getYear(date);
            });
      }
      return !selected || year === getYear(selected);
    };
    _this.onYearClick = function (event, y) {
      var date = _this.props.date;
      if (date === undefined) {
        return;
      }
      _this.handleYearClick(getStartOfYear(setYear(date, y)), event);
    };
    _this.onYearKeyDown = function (event, y) {
      var _a, _b;
      var key = event.key;
      var _c = _this.props,
        date = _c.date,
        yearItemNumber = _c.yearItemNumber,
        handleOnKeyDown = _c.handleOnKeyDown;
      if (key !== KeyType.Tab) {
        // preventDefault on tab event blocks focus change
        event.preventDefault();
      }
      if (!_this.props.disabledKeyboardNavigation) {
        switch (key) {
          case KeyType.Enter:
            if (_this.props.selected == null) {
              break;
            }
            _this.onYearClick(event, y);
            (_b = (_a = _this.props).setPreSelection) === null || _b === void 0
              ? void 0
              : _b.call(_a, _this.props.selected);
            break;
          case KeyType.ArrowRight:
            if (_this.props.preSelection == null) {
              break;
            }
            _this.handleYearNavigation(
              y + 1,
              addYears(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowLeft:
            if (_this.props.preSelection == null) {
              break;
            }
            _this.handleYearNavigation(
              y - 1,
              subYears(_this.props.preSelection, 1),
            );
            break;
          case KeyType.ArrowUp: {
            if (
              date === undefined ||
              yearItemNumber === undefined ||
              _this.props.preSelection == null
            ) {
              break;
            }
            var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
            var offset = VERTICAL_NAVIGATION_OFFSET;
            var newYear = y - offset;
            if (newYear < startPeriod) {
              var leftOverOffset = yearItemNumber % offset;
              if (y >= startPeriod && y < startPeriod + leftOverOffset) {
                offset = leftOverOffset;
              } else {
                offset += leftOverOffset;
              }
              newYear = y - offset;
            }
            _this.handleYearNavigation(
              newYear,
              subYears(_this.props.preSelection, offset),
            );
            break;
          }
          case KeyType.ArrowDown: {
            if (
              date === undefined ||
              yearItemNumber === undefined ||
              _this.props.preSelection == null
            ) {
              break;
            }
            var endPeriod = getYearsPeriod(date, yearItemNumber).endPeriod;
            var offset = VERTICAL_NAVIGATION_OFFSET;
            var newYear = y + offset;
            if (newYear > endPeriod) {
              var leftOverOffset = yearItemNumber % offset;
              if (y <= endPeriod && y > endPeriod - leftOverOffset) {
                offset = leftOverOffset;
              } else {
                offset += leftOverOffset;
              }
              newYear = y + offset;
            }
            _this.handleYearNavigation(
              newYear,
              addYears(_this.props.preSelection, offset),
            );
            break;
          }
        }
      }
      handleOnKeyDown && handleOnKeyDown(event);
    };
    _this.getYearClassNames = function (y) {
      var _a = _this.props,
        date = _a.date,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        excludeDates = _a.excludeDates,
        includeDates = _a.includeDates,
        filterDate = _a.filterDate,
        yearClassName = _a.yearClassName;
      return clsx(
        "react-datepicker__year-text",
        "react-datepicker__year-".concat(y),
        date
          ? yearClassName === null || yearClassName === void 0
            ? void 0
            : yearClassName(setYear(date, y))
          : undefined,
        {
          "react-datepicker__year-text--selected": _this.isSelectedYear(y),
          "react-datepicker__year-text--disabled":
            (minDate ||
              maxDate ||
              excludeDates ||
              includeDates ||
              filterDate) &&
            isYearDisabled(y, _this.props),
          "react-datepicker__year-text--keyboard-selected":
            _this.isKeyboardSelected(y),
          "react-datepicker__year-text--range-start": _this.isRangeStart(y),
          "react-datepicker__year-text--range-end": _this.isRangeEnd(y),
          "react-datepicker__year-text--in-range": _this.isInRange(y),
          "react-datepicker__year-text--in-selecting-range":
            _this.isInSelectingRange(y),
          "react-datepicker__year-text--selecting-range-start":
            _this.isSelectingRangeStart(y),
          "react-datepicker__year-text--selecting-range-end":
            _this.isSelectingRangeEnd(y),
          "react-datepicker__year-text--today": _this.isCurrentYear(y),
        },
      );
    };
    _this.getYearTabIndex = function (y) {
      if (
        _this.props.disabledKeyboardNavigation ||
        _this.props.preSelection == null
      ) {
        return "-1";
      }
      var preSelected = getYear(_this.props.preSelection);
      var isPreSelectedYearDisabled = isYearDisabled(y, _this.props);
      return y === preSelected && !isPreSelectedYearDisabled ? "0" : "-1";
    };
    _this.getYearContent = function (y) {
      return _this.props.renderYearContent
        ? _this.props.renderYearContent(y)
        : y;
    };
    return _this;
  }
  Year.prototype.render = function () {
    var _this = this;
    var yearsList = [];
    var _a = this.props,
      date = _a.date,
      yearItemNumber = _a.yearItemNumber,
      onYearMouseEnter = _a.onYearMouseEnter,
      onYearMouseLeave = _a.onYearMouseLeave;
    if (date === undefined) {
      return null;
    }
    var _b = getYearsPeriod(date, yearItemNumber),
      startPeriod = _b.startPeriod,
      endPeriod = _b.endPeriod;
    var _loop_1 = function (y) {
      yearsList.push(
        React.createElement(
          "div",
          {
            ref: this_1.YEAR_REFS[y - startPeriod],
            onClick: function (event) {
              _this.onYearClick(event, y);
            },
            onKeyDown: function (event) {
              if (isSpaceKeyDown(event)) {
                event.preventDefault();
                event.key = KeyType.Enter;
              }
              _this.onYearKeyDown(event, y);
            },
            tabIndex: Number(this_1.getYearTabIndex(y)),
            className: this_1.getYearClassNames(y),
            onMouseEnter: !this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseEnter(event, y);
                }
              : undefined,
            onPointerEnter: this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseEnter(event, y);
                }
              : undefined,
            onMouseLeave: !this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseLeave(event, y);
                }
              : undefined,
            onPointerLeave: this_1.props.usePointerEvent
              ? function (event) {
                  return onYearMouseLeave(event, y);
                }
              : undefined,
            key: y,
            "aria-current": this_1.isCurrentYear(y) ? "date" : undefined,
          },
          this_1.getYearContent(y),
        ),
      );
    };
    var this_1 = this;
    for (var y = startPeriod; y <= endPeriod; y++) {
      _loop_1(y);
    }
    return React.createElement(
      "div",
      { className: "react-datepicker__year" },
      React.createElement(
        "div",
        {
          className: "react-datepicker__year-wrapper",
          onMouseLeave: !this.props.usePointerEvent
            ? this.props.clearSelectingDate
            : undefined,
          onPointerLeave: this.props.usePointerEvent
            ? this.props.clearSelectingDate
            : undefined,
        },
        yearsList,
      ),
    );
  };
  return Year;
})(Component);

function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;
    if (minDate) {
      isInRange = getYear(minDate) <= newYear;
    }
    if (maxDate && isInRange) {
      isInRange = getYear(maxDate) >= newYear;
    }
    if (isInRange) {
      list.push(newYear);
    }
  }
  return list;
}
var YearDropdownOptions = /** @class */ (function (_super) {
  __extends(YearDropdownOptions, _super);
  function YearDropdownOptions(props) {
    var _this = _super.call(this, props) || this;
    _this.renderOptions = function () {
      var selectedYear = _this.props.year;
      var options = _this.state.yearsList.map(function (year) {
        return React.createElement(
          "div",
          {
            className:
              selectedYear === year
                ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                : "react-datepicker__year-option",
            key: year,
            onClick: _this.onChange.bind(_this, year),
            "aria-selected": selectedYear === year ? "true" : undefined,
          },
          selectedYear === year
            ? React.createElement(
                "span",
                { className: "react-datepicker__year-option--selected" },
                "\u2713",
              )
            : "",
          year,
        );
      });
      var minYear = _this.props.minDate ? getYear(_this.props.minDate) : null;
      var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : null;
      if (
        !maxYear ||
        !_this.state.yearsList.find(function (year) {
          return year === maxYear;
        })
      ) {
        options.unshift(
          React.createElement(
            "div",
            {
              className: "react-datepicker__year-option",
              key: "upcoming",
              onClick: _this.incrementYears,
            },
            React.createElement("a", {
              className:
                "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming",
            }),
          ),
        );
      }
      if (
        !minYear ||
        !_this.state.yearsList.find(function (year) {
          return year === minYear;
        })
      ) {
        options.push(
          React.createElement(
            "div",
            {
              className: "react-datepicker__year-option",
              key: "previous",
              onClick: _this.decrementYears,
            },
            React.createElement("a", {
              className:
                "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous",
            }),
          ),
        );
      }
      return options;
    };
    _this.onChange = function (year) {
      _this.props.onChange(year);
    };
    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };
    _this.shiftYears = function (amount) {
      var years = _this.state.yearsList.map(function (year) {
        return year + amount;
      });
      _this.setState({
        yearsList: years,
      });
    };
    _this.incrementYears = function () {
      return _this.shiftYears(1);
    };
    _this.decrementYears = function () {
      return _this.shiftYears(-1);
    };
    var yearDropdownItemNumber = props.yearDropdownItemNumber,
      scrollableYearDropdown = props.scrollableYearDropdown;
    var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
    _this.state = {
      yearsList: generateYears(
        _this.props.year,
        noOfYear,
        _this.props.minDate,
        _this.props.maxDate,
      ),
    };
    _this.dropdownRef = createRef();
    return _this;
  }
  YearDropdownOptions.prototype.componentDidMount = function () {
    var dropdownCurrent = this.dropdownRef.current;
    if (dropdownCurrent) {
      // Get array from HTMLCollection
      var dropdownCurrentChildren = dropdownCurrent.children
        ? Array.from(dropdownCurrent.children)
        : null;
      var selectedYearOptionEl = dropdownCurrentChildren
        ? dropdownCurrentChildren.find(function (childEl) {
            return childEl.ariaSelected;
          })
        : null;
      dropdownCurrent.scrollTop =
        selectedYearOptionEl && selectedYearOptionEl instanceof HTMLElement
          ? selectedYearOptionEl.offsetTop +
            (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) /
              2
          : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
    }
  };
  YearDropdownOptions.prototype.render = function () {
    var dropdownClass = clsx({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable":
        this.props.scrollableYearDropdown,
    });
    return React.createElement(
      ClickOutsideWrapper,
      {
        className: dropdownClass,
        containerRef: this.dropdownRef,
        onClickOutside: this.handleClickOutside,
      },
      this.renderOptions(),
    );
  };
  return YearDropdownOptions;
})(Component);

var YearDropdown = /** @class */ (function (_super) {
  __extends(YearDropdown, _super);
  function YearDropdown() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      dropdownVisible: false,
    };
    _this.renderSelectOptions = function () {
      var minYear = _this.props.minDate ? getYear(_this.props.minDate) : 1900;
      var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : 2100;
      var options = [];
      for (var i = minYear; i <= maxYear; i++) {
        options.push(React.createElement("option", { key: i, value: i }, i));
      }
      return options;
    };
    _this.onSelectChange = function (event) {
      _this.onChange(parseInt(event.target.value));
    };
    _this.renderSelectMode = function () {
      return React.createElement(
        "select",
        {
          value: _this.props.year,
          className: "react-datepicker__year-select",
          onChange: _this.onSelectChange,
        },
        _this.renderSelectOptions(),
      );
    };
    _this.renderReadView = function (visible) {
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__year-read-view",
          onClick: function (event) {
            return _this.toggleDropdown(event);
          },
        },
        React.createElement("span", {
          className: "react-datepicker__year-read-view--down-arrow",
        }),
        React.createElement(
          "span",
          { className: "react-datepicker__year-read-view--selected-year" },
          _this.props.year,
        ),
      );
    };
    _this.renderDropdown = function () {
      return React.createElement(
        YearDropdownOptions,
        _assign({ key: "dropdown" }, _this.props, {
          onChange: _this.onChange,
          onCancel: _this.toggleDropdown,
        }),
      );
    };
    _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    };
    _this.onChange = function (year) {
      _this.toggleDropdown();
      if (year === _this.props.year) return;
      _this.props.onChange(year);
    };
    _this.toggleDropdown = function (event) {
      _this.setState(
        {
          dropdownVisible: !_this.state.dropdownVisible,
        },
        function () {
          if (_this.props.adjustDateOnChange) {
            _this.handleYearChange(_this.props.date, event);
          }
        },
      );
    };
    _this.handleYearChange = function (date, event) {
      var _a;
      (_a = _this.onSelect) === null || _a === void 0
        ? void 0
        : _a.call(_this, date, event);
      _this.setOpen();
    };
    _this.onSelect = function (date, event) {
      var _a, _b;
      (_b = (_a = _this.props).onSelect) === null || _b === void 0
        ? void 0
        : _b.call(_a, date, event);
    };
    _this.setOpen = function () {
      var _a, _b;
      (_b = (_a = _this.props).setOpen) === null || _b === void 0
        ? void 0
        : _b.call(_a, true);
    };
    return _this;
  }
  YearDropdown.prototype.render = function () {
    var renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }
    return React.createElement(
      "div",
      {
        className:
          "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(
            this.props.dropdownMode,
          ),
      },
      renderedDropdown,
    );
  };
  return YearDropdown;
})(Component);

var DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select",
];
var isDropdownSelect = function (element) {
  var classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};
var Calendar = /** @class */ (function (_super) {
  __extends(Calendar, _super);
  function Calendar(props) {
    var _this = _super.call(this, props) || this;
    _this.monthContainer = undefined;
    _this.handleClickOutside = function (event) {
      _this.props.onClickOutside(event);
    };
    _this.setClickOutsideRef = function () {
      return _this.containerRef.current;
    };
    _this.handleDropdownFocus = function (event) {
      var _a, _b;
      if (isDropdownSelect(event.target)) {
        (_b = (_a = _this.props).onDropdownFocus) === null || _b === void 0
          ? void 0
          : _b.call(_a, event);
      }
    };
    _this.getDateInView = function () {
      var _a = _this.props,
        preSelection = _a.preSelection,
        selected = _a.selected,
        openToDate = _a.openToDate;
      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var current = newDate();
      var initialDate = openToDate || selected || preSelection;
      if (initialDate) {
        return initialDate;
      } else {
        if (minDate && isBefore(current, minDate)) {
          return minDate;
        } else if (maxDate && isAfter(current, maxDate)) {
          return maxDate;
        }
      }
      return current;
    };
    _this.increaseMonth = function () {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: addMonths(date, 1),
          };
        },
        function () {
          return _this.handleMonthChange(_this.state.date);
        },
      );
    };
    _this.decreaseMonth = function () {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: subMonths(date, 1),
          };
        },
        function () {
          return _this.handleMonthChange(_this.state.date);
        },
      );
    };
    _this.handleDayClick = function (day, event, monthSelectedIn) {
      _this.props.onSelect(day, event, monthSelectedIn);
      _this.props.setPreSelection && _this.props.setPreSelection(day);
    };
    _this.handleDayMouseEnter = function (day) {
      _this.setState({ selectingDate: day });
      _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
    };
    _this.handleMonthMouseLeave = function () {
      _this.setState({ selectingDate: undefined });
      _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
    };
    _this.handleYearMouseEnter = function (event, year) {
      _this.setState({ selectingDate: setYear(newDate(), year) });
      !!_this.props.onYearMouseEnter &&
        _this.props.onYearMouseEnter(event, year);
    };
    _this.handleYearMouseLeave = function (event, year) {
      !!_this.props.onYearMouseLeave &&
        _this.props.onYearMouseLeave(event, year);
    };
    _this.handleYearChange = function (date) {
      var _a, _b, _c, _d;
      (_b = (_a = _this.props).onYearChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, date);
      _this.setState({ isRenderAriaLiveMessage: true });
      if (_this.props.adjustDateOnChange) {
        _this.props.onSelect(date);
        (_d = (_c = _this.props).setOpen) === null || _d === void 0
          ? void 0
          : _d.call(_c, true);
      }
      _this.props.setPreSelection && _this.props.setPreSelection(date);
    };
    _this.getEnabledPreSelectionDateForMonth = function (date) {
      if (!isDayDisabled(date, _this.props)) {
        return date;
      }
      var startOfMonth = getStartOfMonth(date);
      var endOfMonth = getEndOfMonth(date);
      var totalDays = differenceInDays(endOfMonth, startOfMonth);
      var preSelectedDate = null;
      for (var dayIdx = 0; dayIdx <= totalDays; dayIdx++) {
        var processingDate = addDays(startOfMonth, dayIdx);
        if (!isDayDisabled(processingDate, _this.props)) {
          preSelectedDate = processingDate;
          break;
        }
      }
      return preSelectedDate;
    };
    _this.handleMonthChange = function (date) {
      var _a, _b, _c;
      var enabledPreSelectionDate =
        (_a = _this.getEnabledPreSelectionDateForMonth(date)) !== null &&
        _a !== void 0
          ? _a
          : date;
      _this.handleCustomMonthChange(enabledPreSelectionDate);
      if (_this.props.adjustDateOnChange) {
        _this.props.onSelect(enabledPreSelectionDate);
        (_c = (_b = _this.props).setOpen) === null || _c === void 0
          ? void 0
          : _c.call(_b, true);
      }
      _this.props.setPreSelection &&
        _this.props.setPreSelection(enabledPreSelectionDate);
    };
    _this.handleCustomMonthChange = function (date) {
      var _a, _b;
      (_b = (_a = _this.props).onMonthChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, date);
      _this.setState({ isRenderAriaLiveMessage: true });
    };
    _this.handleMonthYearChange = function (date) {
      _this.handleYearChange(date);
      _this.handleMonthChange(date);
    };
    _this.changeYear = function (year) {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: setYear(date, Number(year)),
          };
        },
        function () {
          return _this.handleYearChange(_this.state.date);
        },
      );
    };
    _this.changeMonth = function (month) {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: setMonth(date, Number(month)),
          };
        },
        function () {
          return _this.handleMonthChange(_this.state.date);
        },
      );
    };
    _this.changeMonthYear = function (monthYear) {
      _this.setState(
        function (_a) {
          var date = _a.date;
          return {
            date: setYear(
              setMonth(date, getMonth(monthYear)),
              getYear(monthYear),
            ),
          };
        },
        function () {
          return _this.handleMonthYearChange(_this.state.date);
        },
      );
    };
    _this.header = function (date) {
      if (date === void 0) {
        date = _this.state.date;
      }
      var startOfWeek = getStartOfWeek(
        date,
        _this.props.locale,
        _this.props.calendarStartDay,
      );
      var dayNames = [];
      if (_this.props.showWeekNumbers) {
        dayNames.push(
          React.createElement(
            "div",
            { key: "W", className: "react-datepicker__day-name" },
            _this.props.weekLabel || "#",
          ),
        );
      }
      return dayNames.concat(
        [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
          var day = addDays(startOfWeek, offset);
          var weekDayName = _this.formatWeekday(day, _this.props.locale);
          var weekDayClassName = _this.props.weekDayClassName
            ? _this.props.weekDayClassName(day)
            : undefined;
          return React.createElement(
            "div",
            {
              key: offset,
              "aria-label": formatDate(day, "EEEE", _this.props.locale),
              className: clsx("react-datepicker__day-name", weekDayClassName),
            },
            weekDayName,
          );
        }),
      );
    };
    _this.formatWeekday = function (day, locale) {
      if (_this.props.formatWeekDay) {
        return getFormattedWeekdayInLocale(
          day,
          _this.props.formatWeekDay,
          locale,
        );
      }
      return _this.props.useWeekdaysShort
        ? getWeekdayShortInLocale(day, locale)
        : getWeekdayMinInLocale(day, locale);
    };
    _this.decreaseYear = function () {
      _this.setState(
        function (_a) {
          var _b;
          var date = _a.date;
          return {
            date: subYears(
              date,
              _this.props.showYearPicker
                ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0
                  ? _b
                  : Calendar.defaultProps.yearItemNumber
                : 1,
            ),
          };
        },
        function () {
          return _this.handleYearChange(_this.state.date);
        },
      );
    };
    _this.clearSelectingDate = function () {
      _this.setState({ selectingDate: undefined });
    };
    _this.renderPreviousButton = function () {
      var _a, _b, _c;
      if (_this.props.renderCustomHeader) {
        return;
      }
      var monthsShown =
        (_a = _this.props.monthsShown) !== null && _a !== void 0
          ? _a
          : Calendar.defaultProps.monthsShown;
      var monthsToSubtract = _this.props.showPreviousMonths
        ? monthsShown - 1
        : 0;
      var monthSelectedIn =
        (_b = _this.props.monthSelectedIn) !== null && _b !== void 0
          ? _b
          : monthsToSubtract;
      var fromMonthDate = subMonths(_this.state.date, monthSelectedIn);
      var allPrevDaysDisabled;
      switch (true) {
        case _this.props.showMonthYearPicker:
          allPrevDaysDisabled = yearDisabledBefore(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showYearPicker:
          allPrevDaysDisabled = yearsDisabledBefore(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showQuarterYearPicker:
          allPrevDaysDisabled = quarterDisabledBefore(
            _this.state.date,
            _this.props,
          );
          break;
        default:
          allPrevDaysDisabled = monthDisabledBefore(fromMonthDate, _this.props);
          break;
      }
      if (
        (!((_c = _this.props.forceShowMonthNavigation) !== null && _c !== void 0
          ? _c
          : Calendar.defaultProps.forceShowMonthNavigation) &&
          !_this.props.showDisabledMonthNavigation &&
          allPrevDaysDisabled) ||
        _this.props.showTimeSelectOnly
      ) {
        return;
      }
      var iconClasses = [
        "react-datepicker__navigation-icon",
        "react-datepicker__navigation-icon--previous",
      ];
      var classes = [
        "react-datepicker__navigation",
        "react-datepicker__navigation--previous",
      ];
      var clickHandler = _this.decreaseMonth;
      if (
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker
      ) {
        clickHandler = _this.decreaseYear;
      }
      if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--previous--disabled");
        clickHandler = undefined;
      }
      var isForYear =
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker;
      var _d = _this.props,
        _e = _d.previousMonthButtonLabel,
        previousMonthButtonLabel =
          _e === void 0 ? Calendar.defaultProps.previousMonthButtonLabel : _e,
        _f = _d.previousYearButtonLabel,
        previousYearButtonLabel =
          _f === void 0 ? Calendar.defaultProps.previousYearButtonLabel : _f;
      var _g = _this.props,
        _h = _g.previousMonthAriaLabel,
        previousMonthAriaLabel =
          _h === void 0
            ? typeof previousMonthButtonLabel === "string"
              ? previousMonthButtonLabel
              : "Previous Month"
            : _h,
        _j = _g.previousYearAriaLabel,
        previousYearAriaLabel =
          _j === void 0
            ? typeof previousYearButtonLabel === "string"
              ? previousYearButtonLabel
              : "Previous Year"
            : _j;
      return React.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler,
          onKeyDown: _this.props.handleOnKeyDown,
          "aria-label": isForYear
            ? previousYearAriaLabel
            : previousMonthAriaLabel,
        },
        React.createElement(
          "span",
          { className: iconClasses.join(" ") },
          isForYear ? previousYearButtonLabel : previousMonthButtonLabel,
        ),
      );
    };
    _this.increaseYear = function () {
      _this.setState(
        function (_a) {
          var _b;
          var date = _a.date;
          return {
            date: addYears(
              date,
              _this.props.showYearPicker
                ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0
                  ? _b
                  : Calendar.defaultProps.yearItemNumber
                : 1,
            ),
          };
        },
        function () {
          return _this.handleYearChange(_this.state.date);
        },
      );
    };
    _this.renderNextButton = function () {
      var _a;
      if (_this.props.renderCustomHeader) {
        return;
      }
      var allNextDaysDisabled;
      switch (true) {
        case _this.props.showMonthYearPicker:
          allNextDaysDisabled = yearDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showYearPicker:
          allNextDaysDisabled = yearsDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
        case _this.props.showQuarterYearPicker:
          allNextDaysDisabled = quarterDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
        default:
          allNextDaysDisabled = monthDisabledAfter(
            _this.state.date,
            _this.props,
          );
          break;
      }
      if (
        (!((_a = _this.props.forceShowMonthNavigation) !== null && _a !== void 0
          ? _a
          : Calendar.defaultProps.forceShowMonthNavigation) &&
          !_this.props.showDisabledMonthNavigation &&
          allNextDaysDisabled) ||
        _this.props.showTimeSelectOnly
      ) {
        return;
      }
      var classes = [
        "react-datepicker__navigation",
        "react-datepicker__navigation--next",
      ];
      var iconClasses = [
        "react-datepicker__navigation-icon",
        "react-datepicker__navigation-icon--next",
      ];
      if (_this.props.showTimeSelect) {
        classes.push("react-datepicker__navigation--next--with-time");
      }
      if (_this.props.todayButton) {
        classes.push("react-datepicker__navigation--next--with-today-button");
      }
      var clickHandler = _this.increaseMonth;
      if (
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker
      ) {
        clickHandler = _this.increaseYear;
      }
      if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--next--disabled");
        clickHandler = undefined;
      }
      var isForYear =
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker ||
        _this.props.showYearPicker;
      var _b = _this.props,
        _c = _b.nextMonthButtonLabel,
        nextMonthButtonLabel =
          _c === void 0 ? Calendar.defaultProps.nextMonthButtonLabel : _c,
        _d = _b.nextYearButtonLabel,
        nextYearButtonLabel =
          _d === void 0 ? Calendar.defaultProps.nextYearButtonLabel : _d;
      var _e = _this.props,
        _f = _e.nextMonthAriaLabel,
        nextMonthAriaLabel =
          _f === void 0
            ? typeof nextMonthButtonLabel === "string"
              ? nextMonthButtonLabel
              : "Next Month"
            : _f,
        _g = _e.nextYearAriaLabel,
        nextYearAriaLabel =
          _g === void 0
            ? typeof nextYearButtonLabel === "string"
              ? nextYearButtonLabel
              : "Next Year"
            : _g;
      return React.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler,
          onKeyDown: _this.props.handleOnKeyDown,
          "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel,
        },
        React.createElement(
          "span",
          { className: iconClasses.join(" ") },
          isForYear ? nextYearButtonLabel : nextMonthButtonLabel,
        ),
      );
    };
    _this.renderCurrentMonth = function (date) {
      if (date === void 0) {
        date = _this.state.date;
      }
      var classes = ["react-datepicker__current-month"];
      if (_this.props.showYearDropdown) {
        classes.push("react-datepicker__current-month--hasYearDropdown");
      }
      if (_this.props.showMonthDropdown) {
        classes.push("react-datepicker__current-month--hasMonthDropdown");
      }
      if (_this.props.showMonthYearDropdown) {
        classes.push("react-datepicker__current-month--hasMonthYearDropdown");
      }
      return React.createElement(
        "h2",
        { className: classes.join(" ") },
        formatDate(date, _this.props.dateFormat, _this.props.locale),
      );
    };
    _this.renderYearDropdown = function (overrideHide) {
      if (overrideHide === void 0) {
        overrideHide = false;
      }
      if (!_this.props.showYearDropdown || overrideHide) {
        return;
      }
      return React.createElement(
        YearDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          date: _this.state.date,
          onChange: _this.changeYear,
          year: getYear(_this.state.date),
        }),
      );
    };
    _this.renderMonthDropdown = function (overrideHide) {
      if (overrideHide === void 0) {
        overrideHide = false;
      }
      if (!_this.props.showMonthDropdown || overrideHide) {
        return;
      }
      return React.createElement(
        MonthDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          month: getMonth(_this.state.date),
          onChange: _this.changeMonth,
        }),
      );
    };
    _this.renderMonthYearDropdown = function (overrideHide) {
      if (overrideHide === void 0) {
        overrideHide = false;
      }
      if (!_this.props.showMonthYearDropdown || overrideHide) {
        return;
      }
      return React.createElement(
        MonthYearDropdown,
        _assign({}, Calendar.defaultProps, _this.props, {
          date: _this.state.date,
          onChange: _this.changeMonthYear,
        }),
      );
    };
    _this.handleTodayButtonClick = function (event) {
      _this.props.onSelect(getStartOfToday(), event);
      _this.props.setPreSelection &&
        _this.props.setPreSelection(getStartOfToday());
    };
    _this.renderTodayButton = function () {
      if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
        return;
      }
      return React.createElement(
        "div",
        {
          className: "react-datepicker__today-button",
          onClick: _this.handleTodayButtonClick,
        },
        _this.props.todayButton,
      );
    };
    _this.renderDefaultHeader = function (_a) {
      var monthDate = _a.monthDate,
        i = _a.i;
      return React.createElement(
        "div",
        {
          className: "react-datepicker__header ".concat(
            _this.props.showTimeSelect
              ? "react-datepicker__header--has-time-select"
              : "",
          ),
        },
        _this.renderCurrentMonth(monthDate),
        React.createElement(
          "div",
          {
            className:
              "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(
                _this.props.dropdownMode,
              ),
            onFocus: _this.handleDropdownFocus,
          },
          _this.renderMonthDropdown(i !== 0),
          _this.renderMonthYearDropdown(i !== 0),
          _this.renderYearDropdown(i !== 0),
        ),
        React.createElement(
          "div",
          { className: "react-datepicker__day-names" },
          _this.header(monthDate),
        ),
      );
    };
    _this.renderCustomHeader = function (headerArgs) {
      var _a, _b;
      var monthDate = headerArgs.monthDate,
        i = headerArgs.i;
      if (
        (_this.props.showTimeSelect && !_this.state.monthContainer) ||
        _this.props.showTimeSelectOnly
      ) {
        return null;
      }
      var prevMonthButtonDisabled = monthDisabledBefore(
        _this.state.date,
        _this.props,
      );
      var nextMonthButtonDisabled = monthDisabledAfter(
        _this.state.date,
        _this.props,
      );
      var prevYearButtonDisabled = yearDisabledBefore(
        _this.state.date,
        _this.props,
      );
      var nextYearButtonDisabled = yearDisabledAfter(
        _this.state.date,
        _this.props,
      );
      var showDayNames =
        !_this.props.showMonthYearPicker &&
        !_this.props.showQuarterYearPicker &&
        !_this.props.showYearPicker;
      return React.createElement(
        "div",
        {
          className:
            "react-datepicker__header react-datepicker__header--custom",
          onFocus: _this.props.onDropdownFocus,
        },
        (_b = (_a = _this.props).renderCustomHeader) === null || _b === void 0
          ? void 0
          : _b.call(
              _a,
              _assign(_assign({}, _this.state), {
                customHeaderCount: i,
                monthDate: monthDate,
                changeMonth: _this.changeMonth,
                changeYear: _this.changeYear,
                decreaseMonth: _this.decreaseMonth,
                increaseMonth: _this.increaseMonth,
                decreaseYear: _this.decreaseYear,
                increaseYear: _this.increaseYear,
                prevMonthButtonDisabled: prevMonthButtonDisabled,
                nextMonthButtonDisabled: nextMonthButtonDisabled,
                prevYearButtonDisabled: prevYearButtonDisabled,
                nextYearButtonDisabled: nextYearButtonDisabled,
              }),
            ),
        showDayNames &&
          React.createElement(
            "div",
            { className: "react-datepicker__day-names" },
            _this.header(monthDate),
          ),
      );
    };
    _this.renderYearHeader = function (_a) {
      var monthDate = _a.monthDate;
      var _b = _this.props,
        showYearPicker = _b.showYearPicker,
        _c = _b.yearItemNumber,
        yearItemNumber =
          _c === void 0 ? Calendar.defaultProps.yearItemNumber : _c;
      var _d = getYearsPeriod(monthDate, yearItemNumber),
        startPeriod = _d.startPeriod,
        endPeriod = _d.endPeriod;
      return React.createElement(
        "div",
        { className: "react-datepicker__header react-datepicker-year-header" },
        showYearPicker
          ? "".concat(startPeriod, " - ").concat(endPeriod)
          : getYear(monthDate),
      );
    };
    _this.renderHeader = function (_a) {
      var monthDate = _a.monthDate,
        _b = _a.i,
        i = _b === void 0 ? 0 : _b;
      var headerArgs = { monthDate: monthDate, i: i };
      switch (true) {
        case _this.props.renderCustomHeader !== undefined:
          return _this.renderCustomHeader(headerArgs);
        case _this.props.showMonthYearPicker ||
          _this.props.showQuarterYearPicker ||
          _this.props.showYearPicker:
          return _this.renderYearHeader(headerArgs);
        default:
          return _this.renderDefaultHeader(headerArgs);
      }
    };
    _this.renderMonths = function () {
      var _a, _b;
      if (_this.props.showTimeSelectOnly || _this.props.showYearPicker) {
        return;
      }
      var monthList = [];
      var monthsShown =
        (_a = _this.props.monthsShown) !== null && _a !== void 0
          ? _a
          : Calendar.defaultProps.monthsShown;
      var monthsToSubtract = _this.props.showPreviousMonths
        ? monthsShown - 1
        : 0;
      var fromMonthDate =
        _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
          ? addYears(_this.state.date, monthsToSubtract)
          : subMonths(_this.state.date, monthsToSubtract);
      var monthSelectedIn =
        (_b = _this.props.monthSelectedIn) !== null && _b !== void 0
          ? _b
          : monthsToSubtract;
      for (var i = 0; i < monthsShown; ++i) {
        var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
        var monthDate =
          _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker
            ? addYears(fromMonthDate, monthsToAdd)
            : addMonths(fromMonthDate, monthsToAdd);
        var monthKey = "month-".concat(i);
        var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
        var monthShowsDuplicateDaysStart = i > 0;
        monthList.push(
          React.createElement(
            "div",
            {
              key: monthKey,
              ref: function (div) {
                _this.monthContainer =
                  div !== null && div !== void 0 ? div : undefined;
              },
              className: "react-datepicker__month-container",
            },
            _this.renderHeader({ monthDate: monthDate, i: i }),
            React.createElement(
              Month,
              _assign({}, Calendar.defaultProps, _this.props, {
                containerRef: _this.containerRef,
                ariaLabelPrefix: _this.props.monthAriaLabelPrefix,
                day: monthDate,
                onDayClick: _this.handleDayClick,
                handleOnKeyDown: _this.props.handleOnDayKeyDown,
                handleOnMonthKeyDown: _this.props.handleOnKeyDown,
                onDayMouseEnter: _this.handleDayMouseEnter,
                onMouseLeave: _this.handleMonthMouseLeave,
                orderInDisplay: i,
                selectingDate: _this.state.selectingDate,
                monthShowsDuplicateDaysEnd: monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart: monthShowsDuplicateDaysStart,
              }),
            ),
          ),
        );
      }
      return monthList;
    };
    _this.renderYears = function () {
      if (_this.props.showTimeSelectOnly) {
        return;
      }
      if (_this.props.showYearPicker) {
        return React.createElement(
          "div",
          { className: "react-datepicker__year--container" },
          _this.renderHeader({ monthDate: _this.state.date }),
          React.createElement(
            Year,
            _assign({}, Calendar.defaultProps, _this.props, {
              selectingDate: _this.state.selectingDate,
              date: _this.state.date,
              onDayClick: _this.handleDayClick,
              clearSelectingDate: _this.clearSelectingDate,
              onYearMouseEnter: _this.handleYearMouseEnter,
              onYearMouseLeave: _this.handleYearMouseLeave,
            }),
          ),
        );
      }
      return;
    };
    _this.renderTimeSection = function () {
      if (
        _this.props.showTimeSelect &&
        (_this.state.monthContainer || _this.props.showTimeSelectOnly)
      ) {
        return React.createElement(
          Time,
          _assign({}, Calendar.defaultProps, _this.props, {
            onChange: _this.props.onTimeChange,
            format: _this.props.timeFormat,
            intervals: _this.props.timeIntervals,
            monthRef: _this.state.monthContainer,
          }),
        );
      }
      return;
    };
    _this.renderInputTimeSection = function () {
      var time = _this.props.selected
        ? new Date(_this.props.selected)
        : undefined;
      var timeValid = time && isValid(time) && Boolean(_this.props.selected);
      var timeString = timeValid
        ? ""
            .concat(addZero(time.getHours()), ":")
            .concat(addZero(time.getMinutes()))
        : "";
      if (_this.props.showTimeInput) {
        return React.createElement(
          InputTime,
          _assign({}, Calendar.defaultProps, _this.props, {
            date: time,
            timeString: timeString,
            onChange: _this.props.onTimeChange,
          }),
        );
      }
      return;
    };
    _this.renderAriaLiveRegion = function () {
      var _a;
      var _b = getYearsPeriod(
          _this.state.date,
          (_a = _this.props.yearItemNumber) !== null && _a !== void 0
            ? _a
            : Calendar.defaultProps.yearItemNumber,
        ),
        startPeriod = _b.startPeriod,
        endPeriod = _b.endPeriod;
      var ariaLiveMessage;
      if (_this.props.showYearPicker) {
        ariaLiveMessage = "".concat(startPeriod, " - ").concat(endPeriod);
      } else if (
        _this.props.showMonthYearPicker ||
        _this.props.showQuarterYearPicker
      ) {
        ariaLiveMessage = getYear(_this.state.date);
      } else {
        ariaLiveMessage = ""
          .concat(
            getMonthInLocale(getMonth(_this.state.date), _this.props.locale),
            " ",
          )
          .concat(getYear(_this.state.date));
      }
      return React.createElement(
        "span",
        {
          role: "alert",
          "aria-live": "polite",
          className: "react-datepicker__aria-live",
        },
        _this.state.isRenderAriaLiveMessage && ariaLiveMessage,
      );
    };
    _this.renderChildren = function () {
      if (_this.props.children) {
        return React.createElement(
          "div",
          { className: "react-datepicker__children-container" },
          _this.props.children,
        );
      }
      return;
    };
    _this.containerRef = createRef();
    _this.state = {
      date: _this.getDateInView(),
      selectingDate: undefined,
      monthContainer: undefined,
      isRenderAriaLiveMessage: false,
    };
    return _this;
  }
  Object.defineProperty(Calendar, "defaultProps", {
    get: function () {
      return {
        monthsShown: 1,
        forceShowMonthNavigation: false,
        timeCaption: "Time",
        previousYearButtonLabel: "Previous Year",
        nextYearButtonLabel: "Next Year",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next Month",
        yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
      };
    },
    enumerable: false,
    configurable: true,
  });
  Calendar.prototype.componentDidMount = function () {
    var _this = this;
    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = (function () {
        _this.setState({ monthContainer: _this.monthContainer });
      })();
    }
  };
  Calendar.prototype.componentDidUpdate = function (prevProps) {
    var _this = this;
    if (
      this.props.preSelection &&
      (!isSameDay(this.props.preSelection, prevProps.preSelection) ||
        this.props.monthSelectedIn !== prevProps.monthSelectedIn)
    ) {
      var hasMonthChanged_1 = !isSameMonth(
        this.state.date,
        this.props.preSelection,
      );
      this.setState(
        {
          date: this.props.preSelection,
        },
        function () {
          return (
            hasMonthChanged_1 && _this.handleCustomMonthChange(_this.state.date)
          );
        },
      );
    } else if (
      this.props.openToDate &&
      !isSameDay(this.props.openToDate, prevProps.openToDate)
    ) {
      this.setState({
        date: this.props.openToDate,
      });
    }
  };
  Calendar.prototype.render = function () {
    var Container = this.props.container || CalendarContainer;
    return React.createElement(
      ClickOutsideWrapper,
      {
        onClickOutside: this.handleClickOutside,
        style: { display: "contents" },
        ignoreClass: this.props.outsideClickIgnoreClass,
      },
      React.createElement(
        "div",
        { style: { display: "contents" }, ref: this.containerRef },
        React.createElement(
          Container,
          {
            className: clsx("react-datepicker", this.props.className, {
              "react-datepicker--time-only": this.props.showTimeSelectOnly,
            }),
            showTime: this.props.showTimeSelect || this.props.showTimeInput,
            showTimeSelectOnly: this.props.showTimeSelectOnly,
          },
          this.renderAriaLiveRegion(),
          this.renderPreviousButton(),
          this.renderNextButton(),
          this.renderMonths(),
          this.renderYears(),
          this.renderTodayButton(),
          this.renderTimeSection(),
          this.renderInputTimeSection(),
          this.renderChildren(),
        ),
      ),
    );
  };
  return Calendar;
})(Component);

/**
 * `CalendarIcon` is a React component that renders an icon for a calendar.
 * The icon can be a string representing a CSS class, a React node, or a default SVG icon.
 *
 * @component
 * @prop  icon - The icon to be displayed. This can be a string representing a CSS class or a React node.
 * @prop  className - An optional string representing additional CSS classes to be applied to the icon.
 * @prop  onClick - An optional function to be called when the icon is clicked.
 *
 * @example
 * // To use a CSS class as the icon
 * <CalendarIcon icon="my-icon-class" onClick={myClickHandler} />
 *
 * @example
 * // To use a React node as the icon
 * <CalendarIcon icon={<MyIconComponent />} onClick={myClickHandler} />
 *
 * @returns  The `CalendarIcon` component.
 */
var CalendarIcon = function (_a) {
  var icon = _a.icon,
    _b = _a.className,
    className = _b === void 0 ? "" : _b,
    onClick = _a.onClick;
  var defaultClass = "react-datepicker__calendar-icon";
  if (typeof icon === "string") {
    return React.createElement("i", {
      className: ""
        .concat(defaultClass, " ")
        .concat(icon, " ")
        .concat(className),
      "aria-hidden": "true",
      onClick: onClick,
    });
  }
  if (React.isValidElement(icon)) {
    // Because we are checking that typeof icon is string first, we can safely cast icon as React.ReactElement on types level and code level
    var iconElement_1 = icon;
    return React.cloneElement(iconElement_1, {
      className: ""
        .concat(iconElement_1.props.className || "", " ")
        .concat(defaultClass, " ")
        .concat(className),
      onClick: function (event) {
        if (typeof iconElement_1.props.onClick === "function") {
          iconElement_1.props.onClick(event);
        }
        if (typeof onClick === "function") {
          onClick(event);
        }
      },
    });
  }
  // Default SVG Icon
  return React.createElement(
    "svg",
    {
      className: "".concat(defaultClass, " ").concat(className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512",
      onClick: onClick,
    },
    React.createElement("path", {
      d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z",
    }),
  );
};

/**
 * `Portal` is a React component that allows you to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @class
 * @param {PortalProps} props - The properties that define the `Portal` component.
 * @property {React.ReactNode} props.children - The children to be rendered into the `Portal`.
 * @property {string} props.portalId - The id of the DOM node into which the `Portal` will render.
 * @property {ShadowRoot} [props.portalHost] - The DOM node to host the `Portal`.
 */
var Portal = /** @class */ (function (_super) {
  __extends(Portal, _super);
  function Portal(props) {
    var _this = _super.call(this, props) || this;
    _this.portalRoot = null;
    _this.el = document.createElement("div");
    return _this;
  }
  Portal.prototype.componentDidMount = function () {
    this.portalRoot = (this.props.portalHost || document).getElementById(
      this.props.portalId,
    );
    if (!this.portalRoot) {
      this.portalRoot = document.createElement("div");
      this.portalRoot.setAttribute("id", this.props.portalId);
      (this.props.portalHost || document.body).appendChild(this.portalRoot);
    }
    this.portalRoot.appendChild(this.el);
  };
  Portal.prototype.componentWillUnmount = function () {
    if (this.portalRoot) {
      this.portalRoot.removeChild(this.el);
    }
  };
  Portal.prototype.render = function () {
    return ReactDOM.createPortal(this.props.children, this.el);
  };
  return Portal;
})(Component);

var focusableElementsSelector =
  "[tabindex], a, button, input, select, textarea";
var focusableFilter = function (node) {
  if (node instanceof HTMLAnchorElement) {
    return node.tabIndex !== -1;
  }
  return !node.disabled && node.tabIndex !== -1;
};
/**
 * `TabLoop` is a React component that manages tabbing behavior for its children.
 *
 * TabLoop prevents the user from tabbing outside of the popper
 * It creates a tabindex loop so that "Tab" on the last element will focus the first element
 * and "Shift Tab" on the first element will focus the last element
 *
 * @component
 * @example
 * <TabLoop enableTabLoop={true}>
 *   <ChildComponent />
 * </TabLoop>
 *
 * @param props - The properties that define the `TabLoop` component.
 * @param props.children - The child components.
 * @param props.enableTabLoop - Whether to enable the tab loop.
 *
 * @returns The `TabLoop` component.
 */
var TabLoop = /** @class */ (function (_super) {
  __extends(TabLoop, _super);
  function TabLoop(props) {
    var _this = _super.call(this, props) || this;
    /**
     * `getTabChildren` is a method of the `TabLoop` class that retrieves all tabbable children of the component.
     *
     * This method uses the `tabbable` library to find all tabbable elements within the `TabLoop` component.
     * It then filters out any elements that are not visible.
     *
     * @returns An array of all tabbable and visible children of the `TabLoop` component.
     */
    _this.getTabChildren = function () {
      var _a;
      return Array.prototype.slice
        .call(
          (_a = _this.tabLoopRef.current) === null || _a === void 0
            ? void 0
            : _a.querySelectorAll(focusableElementsSelector),
          1,
          -1,
        )
        .filter(focusableFilter);
    };
    _this.handleFocusStart = function () {
      var tabChildren = _this.getTabChildren();
      tabChildren &&
        tabChildren.length > 1 &&
        tabChildren[tabChildren.length - 1].focus();
    };
    _this.handleFocusEnd = function () {
      var tabChildren = _this.getTabChildren();
      tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
    };
    _this.tabLoopRef = createRef();
    return _this;
  }
  TabLoop.prototype.render = function () {
    var _a;
    if (
      !((_a = this.props.enableTabLoop) !== null && _a !== void 0
        ? _a
        : TabLoop.defaultProps.enableTabLoop)
    ) {
      return this.props.children;
    }
    return React.createElement(
      "div",
      { className: "react-datepicker__tab-loop", ref: this.tabLoopRef },
      React.createElement("div", {
        className: "react-datepicker__tab-loop__start",
        tabIndex: 0,
        onFocus: this.handleFocusStart,
      }),
      this.props.children,
      React.createElement("div", {
        className: "react-datepicker__tab-loop__end",
        tabIndex: 0,
        onFocus: this.handleFocusEnd,
      }),
    );
  };
  TabLoop.defaultProps = {
    enableTabLoop: true,
  };
  return TabLoop;
})(Component);

/**
 * `withFloating` is a higher-order component that adds floating behavior to a component.
 *
 * @param Component - The component to enhance.
 *
 * @example
 * const FloatingComponent = withFloating(MyComponent);
 * <FloatingComponent popperModifiers={[]} popperProps={{}} hidePopper={true} />
 *
 * @param popperModifiers - The modifiers to use for the popper.
 * @param popperProps - The props to pass to the popper.
 * @param hidePopper - Whether to hide the popper.
 * @param popperPlacement - The placement of the popper.
 *
 * @returns A new component with floating behavior.
 */
function withFloating(Component) {
  var WithFloating = function (props) {
    var _a;
    var hidePopper =
      typeof props.hidePopper === "boolean" ? props.hidePopper : true;
    var arrowRef = useRef(null);
    var floatingProps = useFloating(
      _assign(
        {
          open: !hidePopper,
          whileElementsMounted: autoUpdate,
          placement: props.popperPlacement,
          middleware: __spreadArray(
            [flip({ padding: 15 }), offset(10), arrow({ element: arrowRef })],
            (_a = props.popperModifiers) !== null && _a !== void 0 ? _a : [],
            true,
          ),
        },
        props.popperProps,
      ),
    );
    var componentProps = _assign(_assign({}, props), {
      hidePopper: hidePopper,
      popperProps: _assign(_assign({}, floatingProps), { arrowRef: arrowRef }),
    });
    return React.createElement(Component, _assign({}, componentProps));
  };
  return WithFloating;
}

// Exported for testing purposes
var PopperComponent = /** @class */ (function (_super) {
  __extends(PopperComponent, _super);
  function PopperComponent() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Object.defineProperty(PopperComponent, "defaultProps", {
    get: function () {
      return {
        hidePopper: true,
      };
    },
    enumerable: false,
    configurable: true,
  });
  PopperComponent.prototype.render = function () {
    var _a = this.props,
      className = _a.className,
      wrapperClassName = _a.wrapperClassName,
      _b = _a.hidePopper,
      hidePopper = _b === void 0 ? PopperComponent.defaultProps.hidePopper : _b,
      popperComponent = _a.popperComponent,
      targetComponent = _a.targetComponent,
      enableTabLoop = _a.enableTabLoop,
      popperOnKeyDown = _a.popperOnKeyDown,
      portalId = _a.portalId,
      portalHost = _a.portalHost,
      popperProps = _a.popperProps,
      showArrow = _a.showArrow;
    var popper = undefined;
    if (!hidePopper) {
      var classes = clsx("react-datepicker-popper", className);
      popper = React.createElement(
        TabLoop,
        { enableTabLoop: enableTabLoop },
        React.createElement(
          "div",
          {
            ref: popperProps.refs.setFloating,
            style: popperProps.floatingStyles,
            className: classes,
            "data-placement": popperProps.placement,
            onKeyDown: popperOnKeyDown,
          },
          popperComponent,
          showArrow &&
            React.createElement(FloatingArrow, {
              ref: popperProps.arrowRef,
              context: popperProps.context,
              fill: "currentColor",
              strokeWidth: 1,
              height: 8,
              width: 16,
              style: { transform: "translateY(-1px)" },
              className: "react-datepicker__triangle",
            }),
        ),
      );
    }
    if (this.props.popperContainer) {
      popper = createElement(this.props.popperContainer, {}, popper);
    }
    if (portalId && !hidePopper) {
      popper = React.createElement(
        Portal,
        { portalId: portalId, portalHost: portalHost },
        popper,
      );
    }
    var wrapperClasses = clsx("react-datepicker-wrapper", wrapperClassName);
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "div",
        { ref: popperProps.refs.setReference, className: wrapperClasses },
        targetComponent,
      ),
      popper,
    );
  };
  return PopperComponent;
})(Component);
var PopperComponent$1 = withFloating(PopperComponent);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return (
      getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2)
    );
  }
  return date1 !== date2;
}
/**
 * General datepicker component.
 */
var INPUT_ERR_1 = "Date input not valid.";
var DatePicker = /** @class */ (function (_super) {
  __extends(DatePicker, _super);
  function DatePicker(props) {
    var _this = _super.call(this, props) || this;
    _this.calendar = null;
    _this.input = null;
    _this.getPreSelection = function () {
      return _this.props.openToDate
        ? _this.props.openToDate
        : _this.props.selectsEnd && _this.props.startDate
          ? _this.props.startDate
          : _this.props.selectsStart && _this.props.endDate
            ? _this.props.endDate
            : newDate();
    };
    // Convert the date from string format to standard Date format
    _this.modifyHolidays = function () {
      var _a;
      return (_a = _this.props.holidays) === null || _a === void 0
        ? void 0
        : _a.reduce(function (accumulator, holiday) {
            var date = new Date(holiday.date);
            if (!isValid(date)) {
              return accumulator;
            }
            return __spreadArray(
              __spreadArray([], accumulator, true),
              [_assign(_assign({}, holiday), { date: date })],
              false,
            );
          }, []);
    };
    _this.calcInitialState = function () {
      var _a;
      var defaultPreSelection = _this.getPreSelection();
      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var boundedPreSelection =
        minDate && isBefore(defaultPreSelection, getStartOfDay(minDate))
          ? minDate
          : maxDate && isAfter(defaultPreSelection, getEndOfDay(maxDate))
            ? maxDate
            : defaultPreSelection;
      return {
        open: _this.props.startOpen || false,
        preventFocus: false,
        inputValue: null,
        preSelection:
          (_a = _this.props.selectsRange
            ? _this.props.startDate
            : _this.props.selected) !== null && _a !== void 0
            ? _a
            : boundedPreSelection,
        // transforming highlighted days (perhaps nested array)
        // to flat Map for faster access in day.jsx
        highlightDates: getHighLightDaysMap(_this.props.highlightDates),
        focused: false,
        // used to focus day in inline version after month has changed, but not on
        // initial render
        shouldFocusDayInline: false,
        isRenderAriaLiveMessage: false,
        wasHidden: false,
      };
    };
    _this.resetHiddenStatus = function () {
      _this.setState(_assign(_assign({}, _this.state), { wasHidden: false }));
    };
    _this.setHiddenStatus = function () {
      _this.setState(_assign(_assign({}, _this.state), { wasHidden: true }));
    };
    _this.setHiddenStateOnVisibilityHidden = function () {
      if (document.visibilityState !== "hidden") {
        return;
      }
      _this.setHiddenStatus();
    };
    _this.clearPreventFocusTimeout = function () {
      if (_this.preventFocusTimeout) {
        clearTimeout(_this.preventFocusTimeout);
      }
    };
    _this.setFocus = function () {
      var _a, _b;
      (_b =
        (_a = _this.input) === null || _a === void 0 ? void 0 : _a.focus) ===
        null || _b === void 0
        ? void 0
        : _b.call(_a, { preventScroll: true });
    };
    _this.setBlur = function () {
      var _a, _b;
      (_b = (_a = _this.input) === null || _a === void 0 ? void 0 : _a.blur) ===
        null || _b === void 0
        ? void 0
        : _b.call(_a);
      _this.cancelFocusInput();
    };
    _this.deferBlur = function () {
      requestAnimationFrame(function () {
        _this.setBlur();
      });
    };
    _this.setOpen = function (open, skipSetBlur) {
      if (skipSetBlur === void 0) {
        skipSetBlur = false;
      }
      _this.setState(
        {
          open: open,
          preSelection:
            open && _this.state.open
              ? _this.state.preSelection
              : _this.calcInitialState().preSelection,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE,
        },
        function () {
          if (!open) {
            _this.setState(
              function (prev) {
                return {
                  focused: skipSetBlur ? prev.focused : false,
                };
              },
              function () {
                !skipSetBlur && _this.deferBlur();
                _this.setState({ inputValue: null });
              },
            );
          }
        },
      );
    };
    _this.inputOk = function () {
      return isDate(_this.state.preSelection);
    };
    _this.isCalendarOpen = function () {
      return _this.props.open === undefined
        ? _this.state.open && !_this.props.disabled && !_this.props.readOnly
        : _this.props.open;
    };
    _this.handleFocus = function (event) {
      var _a, _b;
      var isAutoReFocus = _this.state.wasHidden;
      var isOpenAllowed = isAutoReFocus ? _this.state.open : true;
      if (isAutoReFocus) {
        _this.resetHiddenStatus();
      }
      if (!_this.state.preventFocus) {
        (_b = (_a = _this.props).onFocus) === null || _b === void 0
          ? void 0
          : _b.call(_a, event);
        if (
          isOpenAllowed &&
          !_this.props.preventOpenOnFocus &&
          !_this.props.readOnly
        ) {
          _this.setOpen(true);
        }
      }
      _this.setState({ focused: true });
    };
    _this.sendFocusBackToInput = function () {
      // Clear previous timeout if it exists
      if (_this.preventFocusTimeout) {
        _this.clearPreventFocusTimeout();
      }
      // close the popper and refocus the input
      // stop the input from auto opening onFocus
      // setFocus to the input
      _this.setState({ preventFocus: true }, function () {
        _this.preventFocusTimeout = setTimeout(function () {
          _this.setFocus();
          _this.setState({ preventFocus: false });
        });
      });
    };
    _this.cancelFocusInput = function () {
      clearTimeout(_this.inputFocusTimeout);
      _this.inputFocusTimeout = undefined;
    };
    _this.deferFocusInput = function () {
      _this.cancelFocusInput();
      _this.inputFocusTimeout = setTimeout(function () {
        return _this.setFocus();
      }, 1);
    };
    _this.handleDropdownFocus = function () {
      _this.cancelFocusInput();
    };
    _this.handleBlur = function (event) {
      var _a, _b;
      if (
        !_this.state.open ||
        _this.props.withPortal ||
        _this.props.showTimeInput
      ) {
        (_b = (_a = _this.props).onBlur) === null || _b === void 0
          ? void 0
          : _b.call(_a, event);
      }
      if (_this.state.open && _this.props.open === false) {
        _this.setOpen(false);
      }
      _this.setState({ focused: false });
    };
    _this.handleCalendarClickOutside = function (event) {
      var _a, _b;
      if (!_this.props.inline) {
        _this.setOpen(false);
      }
      (_b = (_a = _this.props).onClickOutside) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
      if (_this.props.withPortal) {
        event.preventDefault();
      }
    };
    // handleChange is called when user types in the textbox
    _this.handleChange = function () {
      var _a, _b, _c, _d, _e;
      var allArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        allArgs[_i] = arguments[_i];
      }
      var event = allArgs[0];
      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw.apply(_this, allArgs);
        if (
          !event ||
          typeof event.isDefaultPrevented !== "function" ||
          event.isDefaultPrevented()
        ) {
          return;
        }
      }
      _this.setState({
        inputValue:
          (event === null || event === void 0
            ? void 0
            : event.target) instanceof HTMLInputElement
            ? event.target.value
            : null,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT,
      });
      var _f = _this.props,
        selectsRange = _f.selectsRange,
        startDate = _f.startDate,
        endDate = _f.endDate;
      var dateFormat =
        (_a = _this.props.dateFormat) !== null && _a !== void 0
          ? _a
          : DatePicker.defaultProps.dateFormat;
      var strictParsing =
        (_b = _this.props.strictParsing) !== null && _b !== void 0
          ? _b
          : DatePicker.defaultProps.strictParsing;
      var value =
        (event === null || event === void 0 ? void 0 : event.target) instanceof
        HTMLInputElement
          ? event.target.value
          : "";
      if (selectsRange) {
        var _g = value.split("-", 2).map(function (val) {
            return val.trim();
          }),
          valueStart = _g[0],
          valueEnd = _g[1];
        var startDateNew = parseDate(
          valueStart !== null && valueStart !== void 0 ? valueStart : "",
          dateFormat,
          _this.props.locale,
          strictParsing,
        );
        var endDateNew = parseDate(
          valueEnd !== null && valueEnd !== void 0 ? valueEnd : "",
          dateFormat,
          _this.props.locale,
          strictParsing,
        );
        var startChanged =
          (startDate === null || startDate === void 0
            ? void 0
            : startDate.getTime()) !==
          (startDateNew === null || startDateNew === void 0
            ? void 0
            : startDateNew.getTime());
        var endChanged =
          (endDate === null || endDate === void 0
            ? void 0
            : endDate.getTime()) !==
          (endDateNew === null || endDateNew === void 0
            ? void 0
            : endDateNew.getTime());
        if (!startChanged && !endChanged) {
          return;
        }
        if (startDateNew && isDayDisabled(startDateNew, _this.props)) {
          return;
        }
        if (endDateNew && isDayDisabled(endDateNew, _this.props)) {
          return;
        }
        (_d = (_c = _this.props).onChange) === null || _d === void 0
          ? void 0
          : _d.call(_c, [startDateNew, endDateNew], event);
      } else {
        // not selectsRange
        var date = parseDate(
          value,
          dateFormat,
          _this.props.locale,
          strictParsing,
          (_e = _this.props.selected) !== null && _e !== void 0
            ? _e
            : undefined,
        );
        // Update selection if either (1) date was successfully parsed, or (2) input field is empty
        if (date || !value) {
          _this.setSelected(date, event, true);
        }
      }
    };
    _this.handleSelect = function (date, event, monthSelectedIn) {
      if (_this.props.shouldCloseOnSelect && !_this.props.showTimeSelect) {
        // Preventing onFocus event to fix issue
        // https://github.com/Hacker0x01/react-datepicker/issues/628
        _this.sendFocusBackToInput();
      }
      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw(event);
      }
      _this.setSelected(date, event, false, monthSelectedIn);
      if (_this.props.showDateSelect) {
        _this.setState({ isRenderAriaLiveMessage: true });
      }
      if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
        _this.setPreSelection(date);
      } else if (!_this.props.inline) {
        if (!_this.props.selectsRange) {
          _this.setOpen(false);
        }
        var _a = _this.props,
          startDate = _a.startDate,
          endDate = _a.endDate;
        if (
          startDate &&
          !endDate &&
          (_this.props.swapRange || !isDateBefore(date, startDate))
        ) {
          _this.setOpen(false);
        }
      }
    };
    // setSelected is called either from handleChange (user typed date into textbox and it was parsed) or handleSelect (user selected date from calendar using mouse or keyboard)
    _this.setSelected = function (date, event, keepInput, monthSelectedIn) {
      var _a, _b;
      var changedDate = date;
      // Early return if selected year/month/day is disabled
      if (_this.props.showYearPicker) {
        if (
          changedDate !== null &&
          isYearDisabled(getYear(changedDate), _this.props)
        ) {
          return;
        }
      } else if (_this.props.showMonthYearPicker) {
        if (changedDate !== null && isMonthDisabled(changedDate, _this.props)) {
          return;
        }
      } else {
        if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
          return;
        }
      }
      var _c = _this.props,
        onChange = _c.onChange,
        selectsRange = _c.selectsRange,
        startDate = _c.startDate,
        endDate = _c.endDate,
        selectsMultiple = _c.selectsMultiple,
        selectedDates = _c.selectedDates,
        minTime = _c.minTime,
        swapRange = _c.swapRange;
      if (
        !isEqual(_this.props.selected, changedDate) ||
        _this.props.allowSameDay ||
        selectsRange ||
        selectsMultiple
      ) {
        if (changedDate !== null) {
          // Preserve previously selected time if only date is currently being changed
          if (
            _this.props.selected &&
            (!keepInput ||
              (!_this.props.showTimeSelect &&
                !_this.props.showTimeSelectOnly &&
                !_this.props.showTimeInput))
          ) {
            changedDate = setTime(changedDate, {
              hour: getHours(_this.props.selected),
              minute: getMinutes(_this.props.selected),
              second: getSeconds(_this.props.selected),
            });
          }
          // If minTime is present then set the time to minTime
          if (
            !keepInput &&
            (_this.props.showTimeSelect || _this.props.showTimeSelectOnly)
          ) {
            if (minTime) {
              changedDate = setTime(changedDate, {
                hour: minTime.getHours(),
                minute: minTime.getMinutes(),
                second: minTime.getSeconds(),
              });
            }
          }
          if (!_this.props.inline) {
            _this.setState({
              preSelection: changedDate,
            });
          }
          if (!_this.props.focusSelectedMonth) {
            _this.setState({ monthSelectedIn: monthSelectedIn });
          }
        }
        if (selectsRange) {
          var noRanges = !startDate && !endDate;
          var hasStartRange = startDate && !endDate;
          var isRangeFilled = startDate && endDate;
          if (noRanges) {
            onChange === null || onChange === void 0
              ? void 0
              : onChange([changedDate, null], event);
          } else if (hasStartRange) {
            if (changedDate === null) {
              onChange === null || onChange === void 0
                ? void 0
                : onChange([null, null], event);
            } else if (isDateBefore(changedDate, startDate)) {
              if (swapRange) {
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange([changedDate, startDate], event);
              } else {
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange([changedDate, null], event);
              }
            } else {
              onChange === null || onChange === void 0
                ? void 0
                : onChange([startDate, changedDate], event);
            }
          }
          if (isRangeFilled) {
            onChange === null || onChange === void 0
              ? void 0
              : onChange([changedDate, null], event);
          }
        } else if (selectsMultiple) {
          if (changedDate !== null) {
            if (
              !(selectedDates === null || selectedDates === void 0
                ? void 0
                : selectedDates.length)
            ) {
              onChange === null || onChange === void 0
                ? void 0
                : onChange([changedDate], event);
            } else {
              var isChangedDateAlreadySelected = selectedDates.some(
                function (selectedDate) {
                  return isSameDay(selectedDate, changedDate);
                },
              );
              if (isChangedDateAlreadySelected) {
                var nextDates = selectedDates.filter(function (selectedDate) {
                  return !isSameDay(selectedDate, changedDate);
                });
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange(nextDates, event);
              } else {
                onChange === null || onChange === void 0
                  ? void 0
                  : onChange(
                      __spreadArray(
                        __spreadArray([], selectedDates, true),
                        [changedDate],
                        false,
                      ),
                      event,
                    );
              }
            }
          }
        } else {
          onChange === null || onChange === void 0
            ? void 0
            : onChange(changedDate, event);
        }
      }
      if (!keepInput) {
        (_b = (_a = _this.props).onSelect) === null || _b === void 0
          ? void 0
          : _b.call(_a, changedDate, event);
        _this.setState({ inputValue: null });
      }
    };
    // When checking preSelection via min/maxDate, times need to be manipulated via getStartOfDay/getEndOfDay
    _this.setPreSelection = function (date) {
      var hasMinDate = isDate(_this.props.minDate);
      var hasMaxDate = isDate(_this.props.maxDate);
      var isValidDateSelection = true;
      if (date) {
        var dateStartOfDay = getStartOfDay(date);
        if (hasMinDate && hasMaxDate) {
          // isDayInRange uses getStartOfDay internally, so not necessary to manipulate times here
          isValidDateSelection = isDayInRange(
            date,
            _this.props.minDate,
            _this.props.maxDate,
          );
        } else if (hasMinDate) {
          var minDateStartOfDay = getStartOfDay(_this.props.minDate);
          isValidDateSelection =
            isAfter(date, minDateStartOfDay) ||
            isEqual(dateStartOfDay, minDateStartOfDay);
        } else if (hasMaxDate) {
          var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
          isValidDateSelection =
            isBefore(date, maxDateEndOfDay) ||
            isEqual(dateStartOfDay, maxDateEndOfDay);
        }
      }
      if (isValidDateSelection) {
        _this.setState({
          preSelection: date,
        });
      }
    };
    _this.toggleCalendar = function () {
      _this.setOpen(!_this.state.open);
    };
    _this.handleTimeChange = function (time) {
      var _a, _b;
      if (_this.props.selectsRange || _this.props.selectsMultiple) {
        return;
      }
      var selected = _this.props.selected
        ? _this.props.selected
        : _this.getPreSelection();
      var changedDate = _this.props.selected
        ? time
        : setTime(selected, {
            hour: getHours(time),
            minute: getMinutes(time),
          });
      _this.setState({
        preSelection: changedDate,
      });
      (_b = (_a = _this.props).onChange) === null || _b === void 0
        ? void 0
        : _b.call(_a, changedDate);
      if (_this.props.shouldCloseOnSelect && !_this.props.showTimeInput) {
        _this.sendFocusBackToInput();
        _this.setOpen(false);
      }
      if (_this.props.showTimeInput) {
        _this.setOpen(true);
      }
      if (_this.props.showTimeSelectOnly || _this.props.showTimeSelect) {
        _this.setState({ isRenderAriaLiveMessage: true });
      }
      _this.setState({ inputValue: null });
    };
    _this.onInputClick = function () {
      var _a, _b;
      if (!_this.props.disabled && !_this.props.readOnly) {
        _this.setOpen(true);
      }
      (_b = (_a = _this.props).onInputClick) === null || _b === void 0
        ? void 0
        : _b.call(_a);
    };
    _this.onInputKeyDown = function (event) {
      var _a, _b, _c, _d, _e, _f;
      (_b = (_a = _this.props).onKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
      var eventKey = event.key;
      if (
        !_this.state.open &&
        !_this.props.inline &&
        !_this.props.preventOpenOnFocus
      ) {
        if (
          eventKey === KeyType.ArrowDown ||
          eventKey === KeyType.ArrowUp ||
          eventKey === KeyType.Enter
        ) {
          (_c = _this.onInputClick) === null || _c === void 0
            ? void 0
            : _c.call(_this);
        }
        return;
      }
      // if calendar is open, these keys will focus the selected item
      if (_this.state.open) {
        if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp) {
          event.preventDefault();
          var selectorString = _this.props.showTimeSelectOnly
            ? ".react-datepicker__time-list-item[tabindex='0']"
            : _this.props.showWeekPicker && _this.props.showWeekNumbers
              ? '.react-datepicker__week-number[tabindex="0"]'
              : _this.props.showFullMonthYearPicker ||
                  _this.props.showMonthYearPicker
                ? '.react-datepicker__month-text[tabindex="0"]'
                : '.react-datepicker__day[tabindex="0"]';
          var selectedItem =
            ((_d = _this.calendar) === null || _d === void 0
              ? void 0
              : _d.containerRef.current) instanceof Element &&
            _this.calendar.containerRef.current.querySelector(selectorString);
          selectedItem instanceof HTMLElement &&
            selectedItem.focus({ preventScroll: true });
          return;
        }
        var copy = newDate(_this.state.preSelection);
        if (eventKey === KeyType.Enter) {
          event.preventDefault();
          event.target.blur();
          if (
            _this.inputOk() &&
            _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE
          ) {
            _this.handleSelect(copy, event);
            !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
          } else {
            _this.setOpen(false);
          }
        } else if (eventKey === KeyType.Escape) {
          event.preventDefault();
          event.target.blur();
          _this.sendFocusBackToInput();
          _this.setOpen(false);
        } else if (eventKey === KeyType.Tab) {
          _this.setOpen(false);
        }
        if (!_this.inputOk()) {
          (_f = (_e = _this.props).onInputError) === null || _f === void 0
            ? void 0
            : _f.call(_e, { code: 1, msg: INPUT_ERR_1 });
        }
      }
    };
    _this.onPortalKeyDown = function (event) {
      var eventKey = event.key;
      if (eventKey === KeyType.Escape) {
        event.preventDefault();
        _this.setState(
          {
            preventFocus: true,
          },
          function () {
            _this.setOpen(false);
            setTimeout(function () {
              _this.setFocus();
              _this.setState({ preventFocus: false });
            });
          },
        );
      }
    };
    // keyDown events passed down to day.jsx
    _this.onDayKeyDown = function (event) {
      var _a, _b, _c, _d, _e, _f;
      var _g = _this.props,
        minDate = _g.minDate,
        maxDate = _g.maxDate,
        disabledKeyboardNavigation = _g.disabledKeyboardNavigation,
        showWeekPicker = _g.showWeekPicker,
        shouldCloseOnSelect = _g.shouldCloseOnSelect,
        locale = _g.locale,
        calendarStartDay = _g.calendarStartDay,
        adjustDateOnChange = _g.adjustDateOnChange,
        inline = _g.inline;
      (_b = (_a = _this.props).onKeyDown) === null || _b === void 0
        ? void 0
        : _b.call(_a, event);
      if (disabledKeyboardNavigation) return;
      var eventKey = event.key;
      var isShiftKeyActive = event.shiftKey;
      var copy = newDate(_this.state.preSelection);
      var calculateNewDate = function (eventKey, date) {
        var newCalculatedDate = date;
        switch (eventKey) {
          case KeyType.ArrowRight:
            newCalculatedDate = showWeekPicker
              ? addWeeks(date, 1)
              : addDays(date, 1);
            break;
          case KeyType.ArrowLeft:
            newCalculatedDate = showWeekPicker
              ? subWeeks(date, 1)
              : subDays(date, 1);
            break;
          case KeyType.ArrowUp:
            newCalculatedDate = subWeeks(date, 1);
            break;
          case KeyType.ArrowDown:
            newCalculatedDate = addWeeks(date, 1);
            break;
          case KeyType.PageUp:
            newCalculatedDate = isShiftKeyActive
              ? subYears(date, 1)
              : subMonths(date, 1);
            break;
          case KeyType.PageDown:
            newCalculatedDate = isShiftKeyActive
              ? addYears(date, 1)
              : addMonths(date, 1);
            break;
          case KeyType.Home:
            newCalculatedDate = getStartOfWeek(date, locale, calendarStartDay);
            break;
          case KeyType.End:
            newCalculatedDate = getEndOfWeek(date);
            break;
        }
        return newCalculatedDate;
      };
      var getNewDate = function (eventKey, date) {
        var MAX_ITERATIONS = 40;
        var eventKeyCopy = eventKey;
        var validDateFound = false;
        var iterations = 0;
        var newSelection = calculateNewDate(eventKey, date);
        while (!validDateFound) {
          if (iterations >= MAX_ITERATIONS) {
            newSelection = date;
            break;
          }
          // if minDate exists and the new selection is before the min date, get the nearest date that isn't disabled
          if (minDate && newSelection < minDate) {
            eventKeyCopy = KeyType.ArrowRight;
            newSelection = isDayDisabled(minDate, _this.props)
              ? calculateNewDate(eventKeyCopy, newSelection)
              : minDate;
          }
          // if maxDate exists and the new selection is after the max date, get the nearest date that isn't disabled
          if (maxDate && newSelection > maxDate) {
            eventKeyCopy = KeyType.ArrowLeft;
            newSelection = isDayDisabled(maxDate, _this.props)
              ? calculateNewDate(eventKeyCopy, newSelection)
              : maxDate;
          }
          if (isDayDisabled(newSelection, _this.props)) {
            // if PageUp and Home is pressed to a disabled date, it will try to find the next available date after
            if (
              eventKeyCopy === KeyType.PageUp ||
              eventKeyCopy === KeyType.Home
            ) {
              eventKeyCopy = KeyType.ArrowRight;
            }
            // if PageDown and End is pressed to a disabled date, it will try to find the next available date before
            if (
              eventKeyCopy === KeyType.PageDown ||
              eventKeyCopy === KeyType.End
            ) {
              eventKeyCopy = KeyType.ArrowLeft;
            }
            newSelection = calculateNewDate(eventKeyCopy, newSelection);
          } else {
            validDateFound = true;
          }
          iterations++;
        }
        return newSelection;
      };
      if (eventKey === KeyType.Enter) {
        event.preventDefault();
        _this.handleSelect(copy, event);
        !shouldCloseOnSelect && _this.setPreSelection(copy);
        return;
      } else if (eventKey === KeyType.Escape) {
        event.preventDefault();
        _this.setOpen(false);
        if (!_this.inputOk()) {
          (_d = (_c = _this.props).onInputError) === null || _d === void 0
            ? void 0
            : _d.call(_c, { code: 1, msg: INPUT_ERR_1 });
        }
        return;
      }
      var newSelection = null;
      switch (eventKey) {
        case KeyType.ArrowLeft:
        case KeyType.ArrowRight:
        case KeyType.ArrowUp:
        case KeyType.ArrowDown:
        case KeyType.PageUp:
        case KeyType.PageDown:
        case KeyType.Home:
        case KeyType.End:
          newSelection = getNewDate(eventKey, copy);
          break;
      }
      if (!newSelection) {
        (_f = (_e = _this.props).onInputError) === null || _f === void 0
          ? void 0
          : _f.call(_e, { code: 1, msg: INPUT_ERR_1 });
        return;
      }
      event.preventDefault();
      _this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
      if (adjustDateOnChange) {
        _this.setSelected(newSelection);
      }
      _this.setPreSelection(newSelection);
      // need to figure out whether month has changed to focus day in inline version
      if (inline) {
        var prevMonth = getMonth(copy);
        var newMonth = getMonth(newSelection);
        var prevYear = getYear(copy);
        var newYear = getYear(newSelection);
        if (prevMonth !== newMonth || prevYear !== newYear) {
          // month has changed
          _this.setState({ shouldFocusDayInline: true });
        } else {
          // month hasn't changed
          _this.setState({ shouldFocusDayInline: false });
        }
      }
    };
    // handle generic key down events in the popper that do not adjust or select dates
    // ex: while focusing prev and next month buttons
    _this.onPopperKeyDown = function (event) {
      var eventKey = event.key;
      if (eventKey === KeyType.Escape) {
        event.preventDefault();
        _this.sendFocusBackToInput();
      }
    };
    _this.onClearClick = function (event) {
      if (event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
      }
      _this.sendFocusBackToInput();
      var _a = _this.props,
        selectsRange = _a.selectsRange,
        onChange = _a.onChange;
      if (selectsRange) {
        onChange === null || onChange === void 0
          ? void 0
          : onChange([null, null], event);
      } else {
        onChange === null || onChange === void 0
          ? void 0
          : onChange(null, event);
      }
      _this.setState({ inputValue: null });
    };
    _this.clear = function () {
      _this.onClearClick();
    };
    _this.onScroll = function (event) {
      if (
        typeof _this.props.closeOnScroll === "boolean" &&
        _this.props.closeOnScroll
      ) {
        if (
          event.target === document ||
          event.target === document.documentElement ||
          event.target === document.body
        ) {
          _this.setOpen(false);
        }
      } else if (typeof _this.props.closeOnScroll === "function") {
        if (_this.props.closeOnScroll(event)) {
          _this.setOpen(false);
        }
      }
    };
    _this.renderCalendar = function () {
      var _a, _b;
      if (!_this.props.inline && !_this.isCalendarOpen()) {
        return null;
      }
      return React.createElement(
        Calendar,
        _assign(
          {
            showMonthYearDropdown: undefined,
            ref: function (elem) {
              _this.calendar = elem;
            },
          },
          _this.props,
          _this.state,
          {
            setOpen: _this.setOpen,
            dateFormat:
              (_a = _this.props.dateFormatCalendar) !== null && _a !== void 0
                ? _a
                : DatePicker.defaultProps.dateFormatCalendar,
            onSelect: _this.handleSelect,
            onClickOutside: _this.handleCalendarClickOutside,
            holidays: getHolidaysMap(_this.modifyHolidays()),
            outsideClickIgnoreClass: outsideClickIgnoreClass,
            onDropdownFocus: _this.handleDropdownFocus,
            onTimeChange: _this.handleTimeChange,
            className: _this.props.calendarClassName,
            container: _this.props.calendarContainer,
            handleOnKeyDown: _this.props.onKeyDown,
            handleOnDayKeyDown: _this.onDayKeyDown,
            setPreSelection: _this.setPreSelection,
            dropdownMode:
              (_b = _this.props.dropdownMode) !== null && _b !== void 0
                ? _b
                : DatePicker.defaultProps.dropdownMode,
          },
        ),
        _this.props.children,
      );
    };
    _this.renderAriaLiveRegion = function () {
      var _a = _this.props,
        _b = _a.dateFormat,
        dateFormat = _b === void 0 ? DatePicker.defaultProps.dateFormat : _b,
        locale = _a.locale;
      var isContainsTime =
        _this.props.showTimeInput || _this.props.showTimeSelect;
      var longDateFormat = isContainsTime ? "PPPPp" : "PPPP";
      var ariaLiveMessage;
      if (_this.props.selectsRange) {
        ariaLiveMessage = "Selected start date: "
          .concat(
            safeDateFormat(_this.props.startDate, {
              dateFormat: longDateFormat,
              locale: locale,
            }),
            ". ",
          )
          .concat(
            _this.props.endDate
              ? "End date: " +
                  safeDateFormat(_this.props.endDate, {
                    dateFormat: longDateFormat,
                    locale: locale,
                  })
              : "",
          );
      } else {
        if (_this.props.showTimeSelectOnly) {
          ariaLiveMessage = "Selected time: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: dateFormat,
              locale: locale,
            }),
          );
        } else if (_this.props.showYearPicker) {
          ariaLiveMessage = "Selected year: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy",
              locale: locale,
            }),
          );
        } else if (_this.props.showMonthYearPicker) {
          ariaLiveMessage = "Selected month: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: "MMMM yyyy",
              locale: locale,
            }),
          );
        } else if (_this.props.showQuarterYearPicker) {
          ariaLiveMessage = "Selected quarter: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy, QQQ",
              locale: locale,
            }),
          );
        } else {
          ariaLiveMessage = "Selected date: ".concat(
            safeDateFormat(_this.props.selected, {
              dateFormat: longDateFormat,
              locale: locale,
            }),
          );
        }
      }
      return React.createElement(
        "span",
        {
          role: "alert",
          "aria-live": "polite",
          className: "react-datepicker__aria-live",
        },
        ariaLiveMessage,
      );
    };
    _this.renderDateInput = function () {
      var _a, _b;
      var _c;
      var className = clsx(
        _this.props.className,
        ((_a = {}), (_a[outsideClickIgnoreClass] = _this.state.open), _a),
      );
      var customInput =
        _this.props.customInput ||
        React.createElement("input", { type: "text" });
      var customInputRef = _this.props.customInputRef || "ref";
      var _d = _this.props,
        _e = _d.dateFormat,
        dateFormat = _e === void 0 ? DatePicker.defaultProps.dateFormat : _e,
        locale = _d.locale;
      var inputValue =
        typeof _this.props.value === "string"
          ? _this.props.value
          : typeof _this.state.inputValue === "string"
            ? _this.state.inputValue
            : _this.props.selectsRange
              ? safeDateRangeFormat(
                  _this.props.startDate,
                  _this.props.endDate,
                  {
                    dateFormat: dateFormat,
                    locale: locale,
                  },
                )
              : _this.props.selectsMultiple
                ? safeMultipleDatesFormat(
                    (_c = _this.props.selectedDates) !== null && _c !== void 0
                      ? _c
                      : [],
                    {
                      dateFormat: dateFormat,
                      locale: locale,
                    },
                  )
                : safeDateFormat(_this.props.selected, {
                    dateFormat: dateFormat,
                    locale: locale,
                  });
      return cloneElement(
        customInput,
        ((_b = {}),
        (_b[customInputRef] = function (input) {
          _this.input = input;
        }),
        (_b.value = inputValue),
        (_b.onBlur = _this.handleBlur),
        (_b.onChange = _this.handleChange),
        (_b.onClick = _this.onInputClick),
        (_b.onFocus = _this.handleFocus),
        (_b.onKeyDown = _this.onInputKeyDown),
        (_b.id = _this.props.id),
        (_b.name = _this.props.name),
        (_b.form = _this.props.form),
        (_b.autoFocus = _this.props.autoFocus),
        (_b.placeholder = _this.props.placeholderText),
        (_b.disabled = _this.props.disabled),
        (_b.autoComplete = _this.props.autoComplete),
        (_b.className = clsx(customInput.props.className, className)),
        (_b.title = _this.props.title),
        (_b.readOnly = _this.props.readOnly),
        (_b.required = _this.props.required),
        (_b.tabIndex = _this.props.tabIndex),
        (_b["aria-describedby"] = _this.props.ariaDescribedBy),
        (_b["aria-invalid"] = _this.props.ariaInvalid),
        (_b["aria-labelledby"] = _this.props.ariaLabelledBy),
        (_b["aria-required"] = _this.props.ariaRequired),
        _b),
      );
    };
    _this.renderClearButton = function () {
      var _a = _this.props,
        isClearable = _a.isClearable,
        disabled = _a.disabled,
        selected = _a.selected,
        startDate = _a.startDate,
        endDate = _a.endDate,
        clearButtonTitle = _a.clearButtonTitle,
        _b = _a.clearButtonClassName,
        clearButtonClassName = _b === void 0 ? "" : _b,
        _c = _a.ariaLabelClose,
        ariaLabelClose = _c === void 0 ? "Close" : _c,
        selectedDates = _a.selectedDates;
      if (
        isClearable &&
        (selected != null ||
          startDate != null ||
          endDate != null ||
          (selectedDates === null || selectedDates === void 0
            ? void 0
            : selectedDates.length))
      ) {
        return React.createElement("button", {
          type: "button",
          className: clsx(
            "react-datepicker__close-icon",
            clearButtonClassName,
            { "react-datepicker__close-icon--disabled": disabled },
          ),
          disabled: disabled,
          "aria-label": ariaLabelClose,
          onClick: _this.onClearClick,
          title: clearButtonTitle,
          tabIndex: -1,
        });
      } else {
        return null;
      }
    };
    _this.state = _this.calcInitialState();
    _this.preventFocusTimeout = undefined;
    return _this;
  }
  Object.defineProperty(DatePicker, "defaultProps", {
    get: function () {
      return {
        allowSameDay: false,
        dateFormat: "MM/dd/yyyy",
        dateFormatCalendar: "LLLL yyyy",
        disabled: false,
        disabledKeyboardNavigation: false,
        dropdownMode: "scroll",
        preventOpenOnFocus: false,
        monthsShown: 1,
        readOnly: false,
        withPortal: false,
        selectsDisabledDaysInRange: false,
        shouldCloseOnSelect: true,
        showTimeSelect: false,
        showTimeInput: false,
        showPreviousMonths: false,
        showMonthYearPicker: false,
        showFullMonthYearPicker: false,
        showTwoColumnMonthYearPicker: false,
        showFourColumnMonthYearPicker: false,
        showYearPicker: false,
        showQuarterYearPicker: false,
        showWeekPicker: false,
        strictParsing: false,
        swapRange: false,
        timeIntervals: 30,
        timeCaption: "Time",
        previousMonthAriaLabel: "Previous Month",
        previousMonthButtonLabel: "Previous Month",
        nextMonthAriaLabel: "Next Month",
        nextMonthButtonLabel: "Next Month",
        previousYearAriaLabel: "Previous Year",
        previousYearButtonLabel: "Previous Year",
        nextYearAriaLabel: "Next Year",
        nextYearButtonLabel: "Next Year",
        timeInputLabel: "Time",
        enableTabLoop: true,
        yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
        focusSelectedMonth: false,
        showPopperArrow: true,
        excludeScrollbar: true,
        customTimeInput: null,
        calendarStartDay: undefined,
        toggleCalendarOnIconClick: false,
        usePointerEvent: false,
      };
    },
    enumerable: false,
    configurable: true,
  });
  DatePicker.prototype.componentDidMount = function () {
    window.addEventListener("scroll", this.onScroll, true);
    document.addEventListener(
      "visibilitychange",
      this.setHiddenStateOnVisibilityHidden,
    );
  };
  DatePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
    var _a, _b, _c, _d;
    if (
      prevProps.inline &&
      hasPreSelectionChanged(prevProps.selected, this.props.selected)
    ) {
      this.setPreSelection(this.props.selected);
    }
    if (
      this.state.monthSelectedIn !== undefined &&
      prevProps.monthsShown !== this.props.monthsShown
    ) {
      this.setState({ monthSelectedIn: 0 });
    }
    if (prevProps.highlightDates !== this.props.highlightDates) {
      this.setState({
        highlightDates: getHighLightDaysMap(this.props.highlightDates),
      });
    }
    if (
      !prevState.focused &&
      !isEqual(prevProps.selected, this.props.selected)
    ) {
      this.setState({ inputValue: null });
    }
    if (prevState.open !== this.state.open) {
      if (prevState.open === false && this.state.open === true) {
        (_b = (_a = this.props).onCalendarOpen) === null || _b === void 0
          ? void 0
          : _b.call(_a);
      }
      if (prevState.open === true && this.state.open === false) {
        (_d = (_c = this.props).onCalendarClose) === null || _d === void 0
          ? void 0
          : _d.call(_c);
      }
    }
  };
  DatePicker.prototype.componentWillUnmount = function () {
    this.clearPreventFocusTimeout();
    window.removeEventListener("scroll", this.onScroll, true);
    document.removeEventListener(
      "visibilitychange",
      this.setHiddenStateOnVisibilityHidden,
    );
  };
  DatePicker.prototype.renderInputContainer = function () {
    var _a = this.props,
      showIcon = _a.showIcon,
      icon = _a.icon,
      calendarIconClassname = _a.calendarIconClassname,
      calendarIconClassName = _a.calendarIconClassName,
      toggleCalendarOnIconClick = _a.toggleCalendarOnIconClick;
    var open = this.state.open;
    if (calendarIconClassname) {
      console.warn(
        "calendarIconClassname props is deprecated. should use calendarIconClassName props.",
      );
    }
    return React.createElement(
      "div",
      {
        className: "react-datepicker__input-container".concat(
          showIcon ? " react-datepicker__view-calendar-icon" : "",
        ),
      },
      showIcon &&
        React.createElement(
          CalendarIcon,
          _assign(
            {
              icon: icon,
              className: clsx(
                calendarIconClassName,
                !calendarIconClassName && calendarIconClassname,
                open && "react-datepicker-ignore-onclickoutside",
              ),
            },
            toggleCalendarOnIconClick
              ? {
                  onClick: this.toggleCalendar,
                }
              : null,
          ),
        ),
      this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion(),
      this.renderDateInput(),
      this.renderClearButton(),
    );
  };
  DatePicker.prototype.render = function () {
    var calendar = this.renderCalendar();
    if (this.props.inline) return calendar;
    if (this.props.withPortal) {
      var portalContainer = this.state.open
        ? React.createElement(
            TabLoop,
            { enableTabLoop: this.props.enableTabLoop },
            React.createElement(
              "div",
              {
                className: "react-datepicker__portal",
                tabIndex: -1,
                onKeyDown: this.onPortalKeyDown,
              },
              calendar,
            ),
          )
        : null;
      if (this.state.open && this.props.portalId) {
        portalContainer = React.createElement(
          Portal,
          _assign({ portalId: this.props.portalId }, this.props),
          portalContainer,
        );
      }
      return React.createElement(
        "div",
        null,
        this.renderInputContainer(),
        portalContainer,
      );
    }
    return React.createElement(
      PopperComponent$1,
      _assign({}, this.props, {
        className: this.props.popperClassName,
        hidePopper: !this.isCalendarOpen(),
        targetComponent: this.renderInputContainer(),
        popperComponent: calendar,
        popperOnKeyDown: this.onPopperKeyDown,
        showArrow: this.props.showPopperArrow,
      }),
    );
  };
  return DatePicker;
})(Component);
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

export {
  CalendarContainer,
  DatePicker as default,
  getDefaultLocale,
  registerLocale,
  setDefaultLocale,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvY2FsZW5kYXJfY29udGFpbmVyLnRzeCIsIi4uL3NyYy9jbGlja19vdXRzaWRlX3dyYXBwZXIudHN4IiwiLi4vc3JjL2RhdGVfdXRpbHMudHMiLCIuLi9zcmMvaW5wdXRfdGltZS50c3giLCIuLi9zcmMvZGF5LnRzeCIsIi4uL3NyYy93ZWVrX251bWJlci50c3giLCIuLi9zcmMvd2Vlay50c3giLCIuLi9zcmMvbW9udGgudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX2Ryb3Bkb3duLnRzeCIsIi4uL3NyYy9tb250aF95ZWFyX2Ryb3Bkb3duX29wdGlvbnMudHN4IiwiLi4vc3JjL21vbnRoX3llYXJfZHJvcGRvd24udHN4IiwiLi4vc3JjL3RpbWUudHN4IiwiLi4vc3JjL3llYXIudHN4IiwiLi4vc3JjL3llYXJfZHJvcGRvd25fb3B0aW9ucy50c3giLCIuLi9zcmMveWVhcl9kcm9wZG93bi50c3giLCIuLi9zcmMvY2FsZW5kYXIudHN4IiwiLi4vc3JjL2NhbGVuZGFyX2ljb24udHN4IiwiLi4vc3JjL3BvcnRhbC50c3giLCIuLi9zcmMvdGFiX2xvb3AudHN4IiwiLi4vc3JjL3dpdGhfZmxvYXRpbmcudHN4IiwiLi4vc3JjL3BvcHBlcl9jb21wb25lbnQudHN4IiwiLi4vc3JjL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XHJcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xyXG4gICAgICAgIHJldHVybiBhcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3duS2V5cyhvKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9fZXh0ZW5kczogX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ246IF9fYXNzaWduLFxyXG4gICAgX19yZXN0OiBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlOiBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbTogX19wYXJhbSxcclxuICAgIF9fZXNEZWNvcmF0ZTogX19lc0RlY29yYXRlLFxyXG4gICAgX19ydW5Jbml0aWFsaXplcnM6IF9fcnVuSW5pdGlhbGl6ZXJzLFxyXG4gICAgX19wcm9wS2V5OiBfX3Byb3BLZXksXHJcbiAgICBfX3NldEZ1bmN0aW9uTmFtZTogX19zZXRGdW5jdGlvbk5hbWUsXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbiAgICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbjogX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXHJcbn07XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwibmFtZXMiOlsiZXh0ZW5kU3RhdGljcyIsImQiLCJiIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJBcnJheSIsInAiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfX2V4dGVuZHMiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwiX19hc3NpZ24iLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXBwbHkiLCJfX3NwcmVhZEFycmF5IiwidG8iLCJmcm9tIiwicGFjayIsImwiLCJhciIsInNsaWNlIiwiY29uY2F0IiwiU3VwcHJlc3NlZEVycm9yIiwiZXJyb3IiLCJzdXBwcmVzc2VkIiwibWVzc2FnZSIsImUiLCJFcnJvciIsIm5hbWUiLCJpc1ZhbGlkRGF0ZSIsImRmSXNTYW1lWWVhciIsImRmSXNTYW1lTW9udGgiLCJkZklzU2FtZVF1YXJ0ZXIiLCJkZklzU2FtZURheSIsImRmSXNFcXVhbCIsIlBvcHBlckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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
