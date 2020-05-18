const { GraphQLServer } = require('graphql-yoga');
const mongoose = require("mongoose");
//const express = require('express');
//const app = express();
//app.get('/', function(req, res){
//   res.send("Hello World!");
//});
//app.listen(8080, '35.171.160.86');
//mongoose.connect("mongodb://localhost/test");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
const Todo = mongoose.model('Todo', {
	text: String,
	complete: Boolean
})

const typeDefs = `
	type Query {
		hello(name: String): String!
		todos: [Todo]
	}
	type Todo {
		id: ID!
		text: String!
		complete: Boolean!
	}
	type Mutation {
		createTodo(text: String!): Todo
		updateTodo(id: ID!, complete: Boolean!): Boolean
		removeTodo(id: ID!): Boolean
	}
`;

const resolvers = {
	Query: {
		hello: (_, { name }) => `Hello ${name || 'World'}`,
		todos: () => Todo.find()
	},
	Mutation: {
		createTodo: async (_, { text }) => {
			const todo = new Todo({ text, complete: false });
			await todo.save();
			return todo;
		},
		updateTodo: async (_, {id, complete}) => {
			await Todo.findByIdAndUpdate(id, {complete});
			return true;
		},
		removeTodo: async (_, {id}) => {
			await Todo.findByIdAndRemove(id);
			return true;
		}
	}
};

const server = new GraphQLServer({ 
	typeDefs, 
	resolvers, 
	introspection: true, 
	playground: true 
});

mongoose.connection.once('open', function() {
	server.start(() => console.log('Server is running on localhost:4000'))
});

