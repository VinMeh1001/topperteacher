import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mockColleges = [
  { id: 1, name: "Harvard University", country: "United States" },
  { id: 2, name: "Oxford University", country: "United Kingdom" },
  { id: 3, name: "Stanford University", country: "United States" },
  { id: 4, name: "MIT", country: "United States" },
  { id: 5, name: "Cambridge University", country: "United Kingdom" },
];

interface CollegeSearchProps {
  onSelect: (college: { id: number; name: string; country: string }) => void;
}

const CollegeSearch = ({ onSelect }: CollegeSearchProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            placeholder="Search for your college..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search colleges..." />
          <CommandEmpty>No college found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {mockColleges.map((college) => (
              <CommandItem
                key={college.id}
                onSelect={() => {
                  onSelect(college);
                  setValue(college.name);
                  setOpen(false);
                }}
                className="flex items-center justify-between"
              >
                <span>{college.name}</span>
                <span className="text-sm text-gray-500">{college.country}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CollegeSearch;