workspace "Note Taker App" "C4 Model for a simple note-taker application" {

    !docs "docs"

    model {
        user = person "User" "A person who writes, edits, and shares notes."
        
        noteTakerSystem = softwareSystem "Note Taker System" "Allows users to sign up, sign in, and manage notes." {
            webApp = container "React Frontend" "A React SPA for user interactions." "React, Browser"

            backend = container "Backend API" "Handles auth, note CRUD, and sharing." "Node.js, Hono, Cloudflare Workers" {

                noteController = component "Note Controller" "Invokes use cases for notes." "Hono"
                userController = component "User Controller" "Invokes use cases for user authentication." "Hono"

                noteModule = component "Note Module" "Implements use cases for note." "Clean Architecture"
                userModule = component "User Module" "Implements use cases for user." "Clean Architecture"

                componentDataAccess = component "Data Access Layer" "Interacts with the D1 database." "SQL Queries/ ORM /D1 SDK"
            }

            database = container "D1 Database" "Stores users, notes, and sharing." "Cloudflare D1"
        }

        // Relationships
        user -> webApp "Uses via browser"
        webApp -> backend "Sends requests (CRUD, Auth, Share)"

        noteController -> noteModule "Invokes notes's use cases"
        userController -> userModule "Invokes users's use cases"

        noteModule -> componentDataAccess 
        userModule -> componentDataAccess 
        componentDataAccess -> database "Executes queries"
    }

    views {
        systemlandscape "SystemLandscape" {
            include *
            autoLayout
        }

        systemcontext noteTakerSystem "SystemContext" {
            description "System Context diagram for the Note Taker App"
            include user
            include noteTakerSystem
            autoLayout
        }

        container noteTakerSystem "Containers" {
            description "Container diagram showing major elements"
            include *
            autoLayout
        }

        component backend "BackendComponents" {
            description "Component diagram for the Backend API"
            include * 
            autoLayout
        }


        styles {
            element "Software System" {
                background #1168bd
                color #ffffff
            }
            element "Person" {
                shape person
                background #08427B
                color #ffffff
            }

            element "Software System" {
                background #1168bd
                color #ffffff
            }

            element "Container" {
                background #438dd5
                color #ffffff
            }

            element "Component" {
                background #85bbf0
                color #000000
            }
        }
    }
}

