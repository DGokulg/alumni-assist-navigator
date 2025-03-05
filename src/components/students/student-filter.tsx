
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Filter, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export interface StudentFilterOptions {
  search: string;
  years: string[];
  branches: string[];
  departments: string[];
  semesters: string[];
  batches: string[];
  hasArrear?: boolean;
  isPlaced?: boolean;
}

interface StudentFilterProps {
  onChange: (filters: StudentFilterOptions) => void;
}

// Sample data - in a real app, these would be fetched from API
const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const branchOptions = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Electronics Engineering", label: "Electronics Engineering" },
];

const departmentOptions = [
  { value: "CSE", label: "CSE" },
  { value: "IT", label: "IT" },
  { value: "EEE", label: "EEE" },
  { value: "MECH", label: "MECH" },
  { value: "CIVIL", label: "CIVIL" },
  { value: "ECE", label: "ECE" },
];

const semesterOptions = [
  { value: "1", label: "1st Semester" },
  { value: "2", label: "2nd Semester" },
  { value: "3", label: "3rd Semester" },
  { value: "4", label: "4th Semester" },
  { value: "5", label: "5th Semester" },
  { value: "6", label: "6th Semester" },
  { value: "7", label: "7th Semester" },
  { value: "8", label: "8th Semester" },
];

const batchOptions = [
  { value: "2019-2023", label: "2019-2023" },
  { value: "2020-2024", label: "2020-2024" },
  { value: "2021-2025", label: "2021-2025" },
  { value: "2022-2026", label: "2022-2026" },
];

const StudentFilter: React.FC<StudentFilterProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<StudentFilterOptions>({
    search: "",
    years: [],
    branches: [],
    departments: [],
    semesters: [],
    batches: [],
    hasArrear: undefined,
    isPlaced: undefined
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleFilterChange = (newFilters: Partial<StudentFilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Count active filters
    let count = 0;
    if (updatedFilters.search) count++;
    if (updatedFilters.years.length) count++;
    if (updatedFilters.branches.length) count++;
    if (updatedFilters.departments.length) count++;
    if (updatedFilters.semesters.length) count++;
    if (updatedFilters.batches.length) count++;
    if (updatedFilters.hasArrear !== undefined) count++;
    if (updatedFilters.isPlaced !== undefined) count++;
    
    setActiveFiltersCount(count);
    
    onChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: "",
      years: [],
      branches: [],
      departments: [],
      semesters: [],
      batches: [],
      hasArrear: undefined,
      isPlaced: undefined
    };
    
    setFilters(resetFilters);
    setActiveFiltersCount(0);
    onChange(resetFilters);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        placeholder="Search by name, register or roll number..."
        value={filters.search}
        onChange={(e) => handleFilterChange({ search: e.target.value })}
        className="flex-1"
      />
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-1 whitespace-nowrap">
            <Filter className="h-4 w-4 mr-1" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-[11px] flex items-center justify-center text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Filter Students</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs" 
                onClick={resetFilters}
              >
                <X className="h-3 w-3 mr-1" />
                Reset all
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="years" className="text-xs font-medium">Years</Label>
                <MultiSelect
                  options={yearOptions}
                  selected={filters.years}
                  onChange={(values) => handleFilterChange({ years: values })}
                  placeholder="Select years..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branches" className="text-xs font-medium">Branches</Label>
                <MultiSelect
                  options={branchOptions}
                  selected={filters.branches}
                  onChange={(values) => handleFilterChange({ branches: values })}
                  placeholder="Select branches..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departments" className="text-xs font-medium">Departments</Label>
                <MultiSelect
                  options={departmentOptions}
                  selected={filters.departments}
                  onChange={(values) => handleFilterChange({ departments: values })}
                  placeholder="Select departments..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semesters" className="text-xs font-medium">Semesters</Label>
                <MultiSelect
                  options={semesterOptions}
                  selected={filters.semesters}
                  onChange={(values) => handleFilterChange({ semesters: values })}
                  placeholder="Select semesters..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="batches" className="text-xs font-medium">Batches</Label>
                <MultiSelect
                  options={batchOptions}
                  selected={filters.batches}
                  onChange={(values) => handleFilterChange({ batches: values })}
                  placeholder="Select batches..."
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-medium">Academic Status</Label>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="arrear-filter" 
                      checked={filters.hasArrear === true}
                      onCheckedChange={(checked) => 
                        handleFilterChange({ 
                          hasArrear: checked === "indeterminate" 
                            ? undefined 
                            : checked === true 
                            ? true 
                            : undefined 
                        })
                      }
                    />
                    <label
                      htmlFor="arrear-filter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Has Arrears
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="placed-filter" 
                      checked={filters.isPlaced === true}
                      onCheckedChange={(checked) => 
                        handleFilterChange({ 
                          isPlaced: checked === "indeterminate" 
                            ? undefined 
                            : checked === true 
                            ? true 
                            : undefined 
                        })
                      }
                    />
                    <label
                      htmlFor="placed-filter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Placed
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StudentFilter;
