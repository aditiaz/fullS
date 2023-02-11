package routes

import (
	"housey/handlers"
	"housey/pkg/mysql"
	"housey/repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)
	r.HandleFunc("/users",h.FindUsers).Methods("GET")
	r.HandleFunc("/user/{id}",h.GetUser).Methods("GET")

}