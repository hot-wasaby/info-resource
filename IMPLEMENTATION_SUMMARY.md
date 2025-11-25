# Laborator 4 - CSV Import/Export Implementation Summary

## Overview
This implementation adds CSV import and export functionality to the Resources module with complete validation for the ResourceEntity.

## Features Implemented

### 1. CSV Import Endpoint
- **Route**: POST `/resources/import`
- **Functionality**:
  - Accepts CSV files with ResourceEntity data
  - Validates file type (CSV), size (max 2MB), and MIME type
  - Parses CSV data and validates each row using existing CreateResourceDto validation
  - Saves only valid records to the data store
  - Returns detailed JSON response with counts of valid/invalid records and error details

### 2. CSV Export Endpoint
- **Route**: GET `/resources/export`
- **Functionality**:
  - Supports filtering via query parameters using existing SearchQueryDto
  - Generates properly formatted CSV with all ResourceEntity fields (except sensitive data)
  - Sets appropriate headers for file download
  - Handles special characters in data (commas, quotes, newlines)

### 3. File Validation Pipe
- **File**: `src/common/pipes/file-validation.pipe.ts`
- **Features**:
  - Validates file type (only .csv allowed)
  - Enforces 2MB file size limit
  - Checks MIME type for CSV files
  - Provides clear error messages for all validation failures

### 4. CSV Parser Service
- **File**: `src/utils/csv-parser.service.ts`
- **Features**:
  - Parses CSV buffer into ResourceEntity objects
  - Maps CSV columns to DTO properties (case-insensitive)
  - Validates each row using existing CreateResourceDto validation rules
  - Separates valid and invalid records with detailed error reporting

### 5. CSV Generator Service
- **File**: `src/utils/csv-generator.service.ts`
- **Features**:
  - Generates properly formatted CSV content
  - Escapes special characters (commas, quotes, newlines) according to CSV standards
  - Handles null/undefined values appropriately

## Technical Details

### Dependencies Added
- `csv-parse`: For parsing CSV files

### Files Modified
1. `src/modules/resources/resources.controller.ts` - Added import/export endpoints
2. `src/modules/resources/resources.module.ts` - Registered new services

### Files Created
1. `src/common/pipes/file-validation.pipe.ts` - File validation logic
2. `src/utils/csv-parser.service.ts` - CSV parsing and validation
3. `src/utils/csv-generator.service.ts` - CSV generation
4. Test files in `test/` directory

## Validation Scenarios Covered

### Import Validation
1. Valid CSV import (all records processed correctly)
2. Invalid file type (returns appropriate error)
3. File size exceeded (returns appropriate error)
4. CSV data validation (reports invalid rows with specific errors)

### Export Validation
1. Export all data (complete CSV generation)
2. Export with filters (filtered CSV generation)

## Testing
Sample CSV files and test scenarios are provided in the `test/` directory:
- `sample-valid.csv`: Valid data for successful import
- `sample-invalid.csv`: Data with various validation errors
- `validation-scenarios.md`: Detailed test scenarios documentation
- `curl-commands.txt`: Example curl commands for manual testing

## Usage Examples

### Import CSV
```bash
curl -X POST http://localhost:3000/resources/import \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample-valid.csv"
```

### Export CSV (all data)
```bash
curl -X GET http://localhost:3000/resources/export \
  -o resources.csv
```

### Export CSV (filtered data)
```bash
curl -X GET "http://localhost:3000/resources/export?name=solar&minPrice=400" \
  -o filtered-resources.csv
```

## Error Handling
All endpoints provide clear, structured error responses:
- File validation errors with descriptive messages
- Data validation errors with row numbers and specific field violations
- System errors with appropriate HTTP status codes