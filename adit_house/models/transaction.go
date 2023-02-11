package models

import "time"

type Transaction struct {
	ID         int       `json:"id"`
	CheckIn    time.Time `json:"check_in"`
	CheckOut   time.Time `json:"check_out"`
	PropertyID    int       `json:"property_id"`
	Property  Property     `json:"property"`
	UserID     int       `json:"user_id"`
	User       User      `json:"user"`
	Total      int  `json:"total"`
	Status     string    `json:"status"`
	Attachment string    `json:"attachment"`

}

func (Transaction) TableName() string {
	return "transactions"
}
