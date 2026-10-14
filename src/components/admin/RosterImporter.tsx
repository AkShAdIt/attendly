"use client";

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  UploadCloud,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ParsedStudentRow {
  id: string;
  name: string;
  srn: string;
  rollNumber: string;
  email: string;
  section: string;
  isValid: boolean;
  errors: string[];
}

interface RosterImporterProps {
  onImportComplete?: (importedStudents: ParsedStudentRow[]) => void;
}

export function RosterImporter({ onImportComplete }: RosterImporterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rows, setRows] = useState<ParsedStudentRow[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setIsProcessing(true);
    setIsCompleted(false);

    const isExcel =
      selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls");

    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json<Record<string, string>>(firstSheet);
          validateAndSetRows(json);
        } catch {
          alert("Error parsing Excel file. Please verify format.");
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          validateAndSetRows(results.data as Record<string, string>[]);
          setIsProcessing(false);
        },
        error: () => {
          alert("Error parsing CSV file.");
          setIsProcessing(false);
        },
      });
    }
  };

  const validateAndSetRows = (rawRows: Record<string, string>[]) => {
    const seenSRNs = new Set<string>();

    const validated: ParsedStudentRow[] = rawRows.map((row, index) => {
      // Flexible column mapping
      const name =
        row["Full Name"] ||
        row["Name"] ||
        row["Student Name"] ||
        row["student_name"] ||
        "";
      const srn =
        row["SRN"] ||
        row["USN"] ||
        row["Roll No"] ||
        row["Student ID"] ||
        row["srn"] ||
        "";
      const rollNumber =
        row["Roll Number"] || row["Roll"] || row["roll_number"] || String(index + 1);
      const email =
        row["Email"] ||
        row["Email Address"] ||
        row["email"] ||
        `${srn ? srn.toLowerCase() : `student${index + 1}`}@college.edu`;
      const section =
        row["Section"] || row["Class"] || row["section"] || "Section A";

      const errors: string[] = [];

      if (!name.trim()) errors.push("Missing student name");
      if (!srn.trim()) {
        errors.push("Missing SRN / Identifier");
      } else if (seenSRNs.has(srn.trim().toUpperCase())) {
        errors.push(`Duplicate SRN (${srn}) in file`);
      } else {
        seenSRNs.add(srn.trim().toUpperCase());
      }

      return {
        id: `row-${index}-${Date.now()}`,
        name: name.trim(),
        srn: srn.trim().toUpperCase(),
        rollNumber: rollNumber.trim(),
        email: email.trim(),
        section: section.trim(),
        isValid: errors.length === 0,
        errors,
      };
    });

    setRows(validated);
  };

  const handleRowDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleConfirmImport = () => {
    const validRows = rows.filter((r) => r.isValid);
    if (validRows.length === 0) return;
    setIsCompleted(true);
    if (onImportComplete) {
      onImportComplete(validRows);
    }
  };

  const handleReset = () => {
    setFile(null);
    setRows([]);
    setIsCompleted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validCount = rows.filter((r) => r.isValid).length;
  const invalidCount = rows.filter((r) => !r.isValid).length;

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Bulk Student Roster Import</CardTitle>
            <CardDescription>
              Upload class roster CSV or Excel (.xlsx) file with student names, SRN, and sections.
            </CardDescription>
          </div>
          {rows.length > 0 && !isCompleted && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-1.5" /> Start Over
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Upload Zone */}
        {rows.length === 0 && !isCompleted && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-10 text-center hover:bg-slate-100/70 hover:border-blue-400 cursor-pointer transition-all"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls"
              className="hidden"
            />
            <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <UploadCloud className="h-7 w-7" />
            </div>
            <h4 className="text-base font-semibold text-slate-800">
              Drop student roster CSV or Excel file here
            </h4>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              Supports columns: <strong>Name, SRN / Roll No, Email, Section</strong>.
            </p>
            <Button size="sm" variant="outline" className="mt-4 pointer-events-none">
              Browse Files
            </Button>
          </div>
        )}

        {/* Step 2: Validation Preview */}
        {rows.length > 0 && !isCompleted && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-100/80 border border-slate-200">
              <div className="flex items-center space-x-2">
                <FileCheck className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-800">
                  {file?.name}
                </span>
                <span className="text-xs text-slate-500">
                  ({rows.length} total rows parsed)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="present">{validCount} Valid</Badge>
                {invalidCount > 0 && (
                  <Badge variant="absent">{invalidCount} Errors Detected</Badge>
                )}
              </div>
            </div>

            {/* Preview Table */}
            <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/90 text-slate-700 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">SRN / ID</th>
                    <th className="p-3 font-semibold">Student Name</th>
                    <th className="p-3 font-semibold">Section</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className={!row.isValid ? "bg-rose-50/40" : "hover:bg-slate-50"}
                    >
                      <td className="p-3">
                        {row.isValid ? (
                          <span className="flex items-center text-emerald-600 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Ready
                          </span>
                        ) : (
                          <span
                            className="flex items-center text-rose-600 font-medium"
                            title={row.errors.join(", ")}
                          >
                            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                            {row.errors[0]}
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono font-semibold text-slate-800">
                        {row.srn || "—"}
                      </td>
                      <td className="p-3 font-medium text-slate-800">{row.name}</td>
                      <td className="p-3 text-slate-600">{row.section}</td>
                      <td className="p-3 text-slate-500">{row.email}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleRowDelete(row.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove row"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Invalid rows will be skipped automatically during commit.
              </span>
              <Button
                variant="default"
                disabled={validCount === 0 || isProcessing}
                onClick={handleConfirmImport}
              >
                Confirm & Enroll {validCount} Students
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success Completion State */}
        {isCompleted && (
          <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-emerald-50/50 border border-emerald-200">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Roster Import Completed Successfully!
            </h4>
            <p className="mt-1 text-sm text-slate-600 max-w-sm">
              Successfully enrolled {validCount} students into their respective sections with verified unique identifiers.
            </p>
            <Button className="mt-5" variant="outline" onClick={handleReset}>
              Import Another Roster
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
