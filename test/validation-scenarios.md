# CSV Import/Export Validation Scenarios

## 1. Valid Import Scenario
- File: `sample-valid.csv`
- Expected Result: Both records should be imported successfully
- Validation Checks:
  - File type: CSV
  - File size: Under 2MB limit
  - Column count: Matches CreateResourceDto (4 columns)
  - Data validation: All fields meet validation criteria

## 2. Invalid Import Scenario
- File: `sample-invalid.csv`
- Expected Result: 
  - 1 valid record should be imported (row 3)
  - 3 invalid records should be reported with specific errors:
    - Row 2: Invalid price (non-numeric)
    - Row 4: Description too short (less than 10 characters)
    - Row 5: Missing price field

## 3. File Validation Errors

### Wrong File Type
- Test with a `.txt` file instead of `.csv`
- Expected Result: Error message "Invalid file type. Allowed types: .csv"

### File Size Exceeded
- Test with a file larger than 2MB
- Expected Result: Error message "File size exceeds 2MB limit"

## 4. Export Scenarios

### Export All Data
- Request: GET `/resources/export`
- Expected Result: CSV file containing all resources with headers

### Export Filtered Data
- Request: GET `/resources/export?name=solar&minPrice=400`
- Expected Result: CSV file containing only resources matching filters

## 5. Implementation Details

### File Validation Pipe
- Validates file type (must be CSV)
- Validates file size (max 2MB)
- Validates MIME type for CSV files

### CSV Parser Service
- Parses CSV data into CreateResourceDto objects
- Validates each row using existing DTO validation rules
- Separates valid and invalid records

### CSV Generator Service
- Generates properly formatted CSV content
- Handles special characters (commas, quotes, newlines) in data
- Excludes sensitive data from export