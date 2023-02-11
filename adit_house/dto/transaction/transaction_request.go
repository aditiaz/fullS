package transactiondto

import (
	"housey/models"
	"time"
)

type CreateTransactionRequest struct {
	CheckIn    time.Time    `json:"check_in"`
	CheckOut   time.Time    `json:"check_out"`
	PropertyID    int          `json:"property_id" form:"property_id" `
	Property      models.Property `json:"property"`
	UserID     int          `json:"user_id" form:"user_id" `
	User       models.User  `json:"user"`
	Total      int     `json:"total"  `
	Status     string       `json:"status" form:"status" `
	Attachment string       `json:"attachment" `
	CreatedAt  time.Time    `json:"created_at"`
	UpdatedAt  time.Time    `json:"updated_at"`
}

type UpdateTransactionRequest struct {
	Status string `json:"status" form:"status"`
}
