import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
  currentPage?: number; // Current page index (0-based)
  onChange?: (pageNumber: number) => void; // Callback for page change
  pageSize?: number; // Number of rows per page
  total?: number; // Total number of rows
  onPageSizeChange?: (pageSize: number) => void; // Callback for page size change
}

export function DataTablePagination({
  currentPage = 0,
  onChange,
  pageSize = 10,
  total = 0,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const pageCount = Math.ceil(total / pageSize); // Calculate the total number of pages
  const canPreviousPage = currentPage > 0; // Determine if there's a previous page
  const canNextPage = currentPage < pageCount - 1; // Determine if there's a next page

  return (
    <div className="flex items-center justify-between overflow-auto px-2">
      <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
        Showing {Math.min(currentPage * pageSize + 1, total)} to{" "}
        {Math.min((currentPage + 1) * pageSize, total)} of {total} row(s).
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPageSizeChange?.(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onChange?.(currentPage - 1)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onChange?.(currentPage + 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
