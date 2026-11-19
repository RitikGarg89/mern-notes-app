# Product Requirements Document (PRD)

## MERN Notes App

**Status:** Initial draft\
**Project type:** Learning project / Full-stack CRUD application\
**Repository:** `mern-notes-app`

------------------------------------------------------------------------

## 1. Product Overview

The MERN Notes App is a minimalist, single-page application for
creating, viewing, editing, and deleting personal notes. It is designed
as a learning project for practising React component architecture, state
management, API integration, and CRUD operations with the MERN stack.

The initial version has no authentication, user profile, dashboard,
categories, tags, search, or other additional features.

## 2. Goals

-   Build a working full-stack CRUD application.
-   Practise breaking a UI into reusable React components.
-   Understand parent-child communication and state ownership in React.
-   Connect a React frontend to an Express and MongoDB backend.
-   Keep the interface minimalist, responsive, and easy to use.

## 3. Target User

The initial version is a single-user learning application. It does not
include accounts or authentication.

## 4. Scope

### In Scope

1.  Create a note.
2.  Display all saved notes.
3.  Edit an existing note.
4.  Delete an individual note.
5.  Persist notes in MongoDB through the backend API.
6.  Display an empty state when there are no notes.
7.  Provide responsive layouts for desktop, tablet, and mobile.

### Out of Scope

-   Registration, login, authentication, or user profiles.
-   Categories, tags, folders, or pinned notes.
-   Search, sorting, or filtering.
-   Rich-text editing, attachments, or image uploads.
-   Sharing, collaboration, notifications, or complex animations.

## 5. User Stories

  -----------------------------------------------------------------------
  ID                      User story              Expected result
  ----------------------- ----------------------- -----------------------
  US-01                   As a user, I want to    The note is saved and
                          enter a title and       appears in the notes
                          description and add a   list.
                          note.                   

  US-02                   As a user, I want to    Saved notes are
                          see all my saved notes. displayed as individual
                                                  cards.

  US-03                   As a user, I want to    The existing title and
                          edit a note.            description appear in
                                                  the form and can be
                                                  updated.

  US-04                   As a user, I want to    The selected note is
                          delete a note.          removed from the list
                                                  and database.

  US-05                   As a user, I want to    A clear empty-state
                          know when no notes      message is displayed.
                          exist.                  
  -----------------------------------------------------------------------

## 6. Functional Requirements

### FR-01: Create Note

-   The form contains a title input and a description textarea.
-   The form provides an **Add Note** button.
-   Both title and description are required.
-   Empty or whitespace-only values must not be submitted.
-   After a successful save, the new note appears in the notes list.
-   After a successful save, the form returns to create mode and clears
    its fields.

### FR-02: View Notes

-   The home page fetches saved notes from the backend.
-   Each note is displayed in an individual card.
-   A note card shows its title, a shortened description preview, and
    its date.
-   Long descriptions may be visually truncated in the card.
-   If no notes exist, the page displays an empty state.

### FR-03: Edit Note

-   Each note card provides an edit action represented by a pencil icon.
-   Selecting edit loads that note's title and description into the Add
    Note form.
-   The form button changes from **Add Note** to **Update Note** while
    editing.
-   Saving changes updates the existing note rather than creating a new
    one.
-   After a successful update, the form returns to create mode.

### FR-04: Delete Note

-   Each note card provides a delete action represented by a trash icon.
-   Selecting delete removes only the selected note.
-   The notes list reflects the deletion after the backend confirms
    success.

### FR-05: Loading and Error Feedback

-   The interface communicates when notes are being fetched or an
    operation is in progress.
-   If an API operation fails, the user receives a clear error message.
-   A failed operation must not be presented as successful.

## 7. UI and Design Requirements

### Design Direction

The interface is minimalist, uncluttered, and focused on note
management.

-   Use the restrained palette from the approved Stitch design.
-   Use consistent typography, spacing, and card styling.
-   Avoid unnecessary decoration, gradients, heavy shadows, and complex
    animation.
-   Keep the layout responsive across desktop, tablet, and mobile.

### Page Layout

The application contains one page: **Home Page**.

1.  **Header**
    -   Heading: `My Notes`
    -   Supporting text:
        `Capture your thoughts and keep everything organized.`
    -   A small saved-notes status label may be displayed as shown in
        the approved design.
2.  **Add Note**
    -   Title input.
    -   Description textarea.
    -   Add Note / Update Note button, depending on the current form
        mode.
3.  **Notes Grid**
    -   Section heading: `Your Notes`.
    -   A note count may be displayed beside the heading, matching the
        design.
    -   Individual note cards arranged in a responsive grid.

### Note Card

Each note card contains: - Note title. - Description preview. - Date
information. - Edit action. - Delete action.

### Responsive Behaviour

  Viewport   Notes layout
  ---------- ----------------------
  Desktop    Three-column grid
  Tablet     Two-column grid
  Mobile     Single-column layout

The visual identity and component styling remain consistent across
viewport sizes. Only layout and spacing adapt.

## 8. React Component Structure

The initial frontend uses three reusable UI components and one page
component.

``` text
src/
├── components/
│   ├── Header.jsx
│   ├── AddNote.jsx
│   └── NoteCard.jsx
├── pages/
│   └── HomePage.jsx
├── features/
│   └── notes/
│       ├── notesSlice.js       # If Redux Toolkit is used
│       └── notesApi.js
├── utils/
│   └── axiosInstance.js
├── App.jsx
└── main.jsx
```

The notes grid is rendered directly inside `HomePage`. A separate
`NoteList` component is not required for the initial version.

  -----------------------------------------------------------------------
  Component                           Responsibility
  ----------------------------------- -----------------------------------
  `App`                               Application root.

  `HomePage`                          Composes the page, renders note
                                      cards, and coordinates page-level
                                      interactions.

  `Header`                            Displays the page heading and
                                      supporting information.

  `AddNote`                           Displays the title and description
                                      fields and submits create or update
                                      operations.

  `NoteCard`                          Displays one note and exposes edit
                                      and delete actions.
  -----------------------------------------------------------------------

## 9. Frontend State and Interaction Design

The page must know which note is currently being edited.

A simple approach is to keep an `editingNote` state in `HomePage`:

-   `editingNote === null`: the form is in create mode.
-   `editingNote` contains a note object: the form is in edit mode.

### Edit Flow

1.  The user selects the edit icon on a `NoteCard`.
2.  `NoteCard` calls an edit callback supplied by `HomePage`, passing
    the selected note.
3.  `HomePage` stores that note in `editingNote`.
4.  `HomePage` passes `editingNote` to `AddNote`.
5.  `AddNote` displays the existing title and description.
6.  The user submits the updated values.
7.  The frontend sends an update request to the backend.
8.  After success, the note data is updated and `editingNote` is reset
    to `null`.

### Create Flow

1.  The user enters a title and description in `AddNote`.
2.  The form submits the data to the backend.
3.  After success, the new note appears in the notes grid.
4.  The form is cleared.

### Delete Flow

1.  The user selects the delete icon on a `NoteCard`.
2.  The frontend sends a delete request for that note.
3.  After success, the deleted note is removed from the displayed
    collection.

### State Management Decision

The initial implementation should avoid unnecessary complexity. Local
React state is sufficient for form mode and page-only UI state. Redux
Toolkit may be used for shared notes data and asynchronous API
operations if chosen, but Redux is not a requirement of this PRD.

## 10. Backend Requirements

### Technology

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

### Note Data Model

  Field           Type               Requirement
  --------------- ------------------ -------------------------------
  `_id`           MongoDB ObjectId   Generated by MongoDB/Mongoose
  `title`         String             Required
  `description`   String             Required
  `createdAt`     Date               Automatically managed
  `updatedAt`     Date               Automatically managed

Mongoose timestamps should be enabled to maintain `createdAt` and
`updatedAt`.

### API Endpoints

Base route: `/api/v1/notes`

  Method   Endpoint              Purpose
  -------- --------------------- --------------------
  GET      `/api/v1/notes`       Retrieve all notes
  POST     `/api/v1/notes`       Create a note
  PATCH    `/api/v1/notes/:id`   Update a note
  DELETE   `/api/v1/notes/:id`   Delete a note

The API validates required fields and returns consistent success and
error responses.

## 11. Acceptance Criteria

-   [ ] The home page matches the approved minimalist design.
-   [ ] Header, add-note form, and note cards are separate components.
-   [ ] The notes grid is rendered directly in `HomePage`.
-   [ ] A user can create a note with a title and description.
-   [ ] Saved notes are fetched from MongoDB and displayed.
-   [ ] A user can edit a note using the existing Add Note form.
-   [ ] A user can delete an individual note.
-   [ ] Empty input is validated.
-   [ ] Loading and API errors are handled clearly.
-   [ ] The layout works at desktop, tablet, and mobile widths.
-   [ ] No out-of-scope features are added.

## 12. Suggested Implementation Phases

1.  **Frontend planning:** Review the design, identify components, and
    decide state ownership.
2.  **Frontend UI:** Build the page, header, form, and note cards using
    sample data.
3.  **React interactions:** Implement create, edit, and delete
    interactions.
4.  **Backend:** Create the Express server, Mongoose model, controllers,
    and routes.
5.  **API integration:** Connect the frontend to the backend.
6.  **Testing and refinement:** Verify CRUD operations, validation,
    error handling, and responsive behaviour.

## 13. Success Definition

The project succeeds when it provides a simple, responsive Notes App
with reliable create, read, update, and delete functionality, while
demonstrating a clear React component structure and a working MERN
backend.
