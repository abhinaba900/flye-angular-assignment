# Angular Workout Management Application

## Overview

This project is an Angular application that includes a data table and a modal dialog for managing workout entries. The data is stored in local storage, and the application achieves 100% code coverage with comprehensive unit tests.

## Features

- **Data Table**: Displays aggregated workout data.
- **Modal Dialog**: Allows users to add new workout entries.
- **Local Storage**: Persists workout data in the browser's local storage.
- **Filtering**: Provides global and specific workout filters.

## Project Structure

### Components

#### `DataTableComponent`

**Purpose**: Displays a table of aggregated workout data and provides filtering options.

**Functions**:
- **ngOnInit**: Initializes the component and loads data from local storage.
- **isLocalStorageAvailable**: Checks if local storage is available in the browser.
- **loadFromLocalStorage**: Loads workout data from local storage or sets initial data if local storage is empty.
- **saveToLocalStorage**: Saves the current workout data to local storage.
- **aggregateData**: Aggregates the raw workout data to show the total number of workouts and total workout minutes for each user, ensuring unique workouts are combined.
- **onGlobalFilter**: Filters the table data based on a global search input.
- **onWorkoutFilterChange**: Filters the table data based on a selected workout type.
- **applyFilters**: Applies both the global and workout filters to the table data.
- **showDialog**: Shows the modal dialog for adding new workouts.
- **addWorkout**: Adds a new workout entry, saves it to local storage, and updates the table data.

**Tests**:
- Creation of the component.
- Loading of data from local storage.
- Aggregation of workout data.
- Application of global and workout filters.
- Adding a new workout entry and saving it to local storage.

#### `AppDataModalComponent`

**Purpose**: Provides a modal dialog for adding new workout entries.

**Functions**:
- **isLocalStorageAvailable**: Checks if local storage is available in the browser.
- **showDialog**: Shows the modal dialog.
- **hideDialog**: Hides the modal dialog.
- **addWorkout**: Adds a new workout entry, saves it to local storage, emits the new entry to the parent component, and resets the form.

**Tests**:
- Creation of the component.
- Showing and hiding the modal dialog.
- Emission of new workout entries and saving them to local storage.
- Validation of form inputs before adding workouts.
- Checking for local storage availability.

#### `DataVisualizationComponent`

**Purpose**: Visualizes user workout data in a bar chart and allows the selection of different users to update the visualization.

**Functions**:
- **ngOnInit**: Initializes the component, sets the first user as the selected user, and updates the chart data if users are available.
- **ngOnChanges**: Updates the chart data when the users input changes.
- **showDialog**: Opens the data visualization dialog.
- **onUserSelect**: Sets the selected user and updates the chart data when a user is selected from the list.
- **updateChartData**: Updates the chart data based on the selected user's workout data, filtering out zero values.

**Detailed Function Descriptions**:

- **ngOnInit**:
  - Checks if there are users available.
  - If users are available, sets the first user as the selected user.
  - Calls `updateChartData` to set the initial chart data.

- **ngOnChanges**:
  - Listens for changes to the users input.
  - If the users input changes and `selectedUser` is set, calls `updateChartData` to update the chart data.

- **showDialog**:
  - Sets `displayModal` to true, which opens the data visualization dialog.

- **onUserSelect**:
  - Updates the `selectedUser` when a user is selected from the list.
  - Calls `updateChartData` to refresh the chart data based on the newly selected user.

- **updateChartData**:
  - Checks if `selectedUser` is set.
  - Filters the selected user's workout data to exclude entries with zero values.
  - Maps the filtered workout data to labels and data arrays.
  - Sets `chartData` with the labels and data arrays, configuring the chart for display.

**Tests**:
- Creation of the component.
- Dialog visibility when `showDialog` is called.
- Initialization with users: checks if the first user is set as the selected user on initialization if users are available.
- Updating chart data on user selection.
- Filtering zero values in chart data.
