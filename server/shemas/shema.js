const graphql = require('graphql')
const _=require('lodash')
const authorModel = require('../models/author_model')
const bookModel = require('../models/book_model')


const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

/*const books = [
    {id:"1",name:"Le monde s effondre",genre:"drame",authorId:"1"},
    {id:"2",name:"Le vieux nègre et la medaille",genre:"drame",authorId:"2"},
    {id:"3",name:"Enfant Noir",genre:"drame",authorId:"3"},
    {id:"4",name:"Mamadou et Bineta",genre:"education",authorId:"2"},
    {id:"5",name:"Vinland",genre:"drame",authorId:"2"},
    {id:"6",name:"Afrique mon Afrique",genre:"drame",authorId:"3"},
    {id:"7",name:"Okonkwo",genre:"drame",authorId:"1"},
    {id:"8",name:"La pirogue",genre:"drame",authorId:"2"},
    {id:"9",name:"Burkina Faso",genre:"drame",authorId:"4"}
]

const authors = [
    {id:"1",name:"Chinua ACHEBE",age:45},
    {id:"2",name:"Oyono",age:54},
    {id:"3",name:"Camara Laye",age: 40},
    {id:"4",name:"Smarty",age:35}
]
*/

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        book:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
               // return _.filter(books,{authorId:parent.id})
               return bookModel.find({authorId:parent.id})
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
               // return _.find(authors,{id:parent.authorId})
               return authorModel.findOne({id:parent.authorId})
            }
        }
    })
})

const RootQuery= new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        book:{
            type:BookType,
            args:{id:{type: GraphQLString}},
            resolve(parent,args){
                //We take data from a database
               // return _.find(books,{id:args.id})
               return bookModel.findOne({id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type: GraphQLString}},
            resolve(parent,args){
              //  return _.find(authors,{id:args.id})
              return authorModel.findOne({id:args.id})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
              //  return books;
              return bookModel.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors;
               return authorModel.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
   name:"Mutation",
   fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author = new authorModel({
                    id:args.id,
                    name:args.name,
                    age:args.age
                });
                //Save in database
                //We return to see the added data in graphQL front
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLString}
            },
            resolve(parent,args){
                let book = new bookModel({
                    id:args.id,
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                //Save in database
                //We return to see the added data in graphQL front
                return book.save()
            }
        }
   }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})