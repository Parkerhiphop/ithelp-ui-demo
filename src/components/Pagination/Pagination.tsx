import {
  forwardRef,
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "../Icon/src";
import Icon from '../Icon/Icon';

export const range = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, i) => start + i);
};


export interface PaginationProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'onChange'> {
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number;
  /**
   * The text displayed in the jumper `button` content.
   */
  buttonText?: string;
  /**
   * The current page number.
   * @default 1
   */
  current?: number;
  /**
   * Whether the fields is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePreviousButton?: boolean;
  /**
   * The hint text displayed in front of jumper `input`.
   */
  hintText?: string;
  /**
  * The hint displayed in the jumper `input` before the user enters a value.
  */
  inputPlaceholder?: string;
  // /**
  //  * Render the item.
  //  * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
  //  * @returns {ReactNode}
  //  * @default (item) => <PaginationItem {...item} />
  //  */
  // itemRender?: (item: PaginationItemProps) => ReactNode;
  /**
   * Callback fired when the page is changed.
   *
   * @param {number} page The page active.
   */
  onPageChange?: (page: number) => void;
  /**
   * Number of data per page
   * @default 5
   */
  pageSize?: number;
  /**
   * Show jumper or not.
   */
  showJumper?: boolean;
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Items total count.
   * @default 0
   */
  total?: number;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(props, ref) {
  const {
    className,
    buttonText,
    current = 1,
    hintText,
    inputPlaceholder,
    onPageChange,
    total = 0,
    ...rest
  } = props;

  const buttonClass =
    "inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50";

  const activeClass = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
  const inActiveClass =
    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";
  const ellipsisClass = "border-gray-300 bg-white text-gray-700";

  const pageList = useMemo(() => {
    const startPage = 1;
    const endPage = total;

    if (total < 7) {
      return range(startPage, endPage);
    }

    const minPageCount = 5;

    const defaultStartPageBoundary = minPageCount - startPage;
    const defaultEndPageBoundary = endPage - minPageCount;

    const startPages =
      current <= defaultStartPageBoundary
        ? range(startPage, minPageCount)
        : [startPage];
    const endPages =
      current > defaultEndPageBoundary
        ? range(endPage - minPageCount + 1, endPage)
        : [endPage];

    const currentInMiddle =
      current > defaultStartPageBoundary &&
        defaultEndPageBoundary >= current &&
        current !== total
        ? current
        : null;

    const siblingStart =
      currentInMiddle > defaultStartPageBoundary ? currentInMiddle - 1 : null;
    const siblingEnd =
      currentInMiddle >= defaultStartPageBoundary + 1 &&
        defaultEndPageBoundary + 1 > currentInMiddle
        ? currentInMiddle + 1
        : null;

    return [
      ...startPages,
      currentInMiddle - startPage > 2 ? "ellipsisLeft" : "",
      siblingStart,
      currentInMiddle,
      siblingEnd,
      total - currentInMiddle > 2 ? "ellipsisRight" : "",
      ...endPages,
    ].filter((page) => page);
  }, [current, total]);

  return (
    <div
      {...rest}
      ref={ref}
      aria-label="pagination navigation"
      className="w-full flex items-center justify-center"
    >
      <nav
        className="z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          type="button"
          className={`${buttonClass} disabled:opacity-50`}
          disabled={current === 1}
          onClick={() => onPageChange(1)}
        >
          To Top
        </button>
        <button
          className={`${buttonClass} disabled:opacity-50`}
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
        >
          <Icon icon={ChevronLeftIcon} />
        </button>
        {pageList.map((page) => {
          const isEllipsis = page.toString().includes("ellipsis");

          return (
            <li
              key={page}
              className={`
                w-11 inline-flex items-center px-4 py-2 border text-sm font-medium 
                ${page === current
                  ? activeClass
                  : isEllipsis
                    ? ellipsisClass
                    : inActiveClass
                }
              `}
              onClick={() => {
                if (!isEllipsis) {
                  onPageChange(page);
                }
              }}
            >
              {isEllipsis ? "..." : page}
            </li>
          );
        })}
        <button
          type="button"
          className={`${buttonClass} disabled:opacity-50`}
          disabled={current === total}
          onClick={() => onPageChange(current + 1)}
        >
          <Icon icon={ChevronRightIcon} />
        </button>
        <button
          type="button"
          className={`${buttonClass} disabled:opacity-50`}
          disabled={current === total}
          onClick={() => onPageChange(total)}
        >
          To End
        </button>
      </nav>
    </div>
  );
});

export default Pagination;
