package models

import (
	"time"

	"gorm.io/datatypes"
)

type Property struct {
	ID          int            `json:"id"`
	Name_Property string         `json:"name_property"`	
	City        string           `json:"city" `
	Address     string         `json:"address"`
	Price        float64       `json:"price"`
	TypeRent    string         `json:"type_of_rent" `
	// Amenities   string `json:"amenities"`
	Amenities   datatypes.JSON `json:"amenities" `
	Bedroom     int            `json:"bedroom"`
	Bathroom    int            `json:"bathroom"`
	Sqf         string    `json:"sqf"`
	Description string         `json:"description"`
	Image       string         `json:"image" `
	CreatedAt   time.Time      `json:"-"`
	UpdatedAt   time.Time      `json:"-"`
	// User_Id  int                 `json:"user_id"`
	// User    UsersProfileResponse     `json:"user"`     
}



func (Property) TableName() string {
	return "properties"
}
