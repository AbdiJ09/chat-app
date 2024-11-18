import { useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const BottomSheetExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>

      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="h-full rounded-t-[10px] bg-white dark:bg-gray-800 flex flex-col">
          {/* Drag Handle */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-700 my-4" />

          {/* Content */}
          <div className="flex-1 px-4">
            <div className="mb-2 text-2xl font-bold">Move Goal</div>
            <div className="text-gray-500 dark:text-gray-400">Set your daily activity goal.</div>

            {/* Your actual content goes here */}
            <div className="mt-8 space-y-4">
              <div className="text-4xl font-bold text-center">350</div>
              <div className="text-sm text-center text-gray-500">CALORIES/DAY</div>

              {/* Buttons */}
              <div className="pt-8 space-y-2">
                <Button
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Submit
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
};

export default BottomSheetExample;
