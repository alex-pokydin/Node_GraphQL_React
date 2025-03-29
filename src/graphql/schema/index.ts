import { buildSchema } from "graphql";

export default buildSchema(`
    type Booking {
        id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type Event {
        id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
        bookings: [Booking!]
    }

    type User {
        id: ID!
        name: String!
        password: String
        email: String!
        Events: [Event!]
        bookings: [Booking!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        name: String!
        password: String
        email: String!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }

    type RootQuery {
        events: [Event!]!
        users: [User!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }
`);
