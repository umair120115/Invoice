import { useState } from 'react';
import NewFooter from '../components/NewFooter';
import { ChefHat, Star, Clock, MapPin, Phone, ArrowLeft, Filter ,LocateFixedIcon} from 'lucide-react';

const RestaurantMenuUI = () => {
    const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample products data structure matching your API
  const productsData = {
    "Punjabi Chaap House  - Humber": [
        {
            "id": "44deeb61-1c59-42ba-85a3-bafa7501d5c5",
            "product_id": "PRD96DD4B69",
            "name": "Mix Paratha",
            "category": "Food",
            "subcategory": "ad292445-05a7-4078-9126-a8ff7bd01413",
            "price": "11.00",
            "discount_price": "11.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Mix+Paratha.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:11:08.729473-04:00",
            "updated_at": "2025-10-14T11:11:08.729478-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "695095ad-2d00-414a-b004-c3b8d252943c",
            "product_id": "PRD8C3A2C53",
            "name": "Gobhi Paratha",
            "category": "Food",
            "subcategory": "ad292445-05a7-4078-9126-a8ff7bd01413",
            "price": "10.00",
            "discount_price": "10.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Gobi+Paratha+Plate.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:09:29.986747-04:00",
            "updated_at": "2025-10-14T11:09:29.986754-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "14be25c0-6945-4b7e-87f7-b87d614c7701",
            "product_id": "PRD663BD5DB",
            "name": "Paneer Paratha",
            "category": "Food",
            "subcategory": "ad292445-05a7-4078-9126-a8ff7bd01413",
            "price": "11.00",
            "discount_price": "11.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Paneer+Paratha_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:08:27.809097-04:00",
            "updated_at": "2025-10-14T11:08:27.809103-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "ddbaca83-5832-4722-9648-6742d71752d8",
            "product_id": "PRDFB77F27E",
            "name": "Aloo Paratha",
            "category": "Food",
            "subcategory": "ad292445-05a7-4078-9126-a8ff7bd01413",
            "price": "10.00",
            "discount_price": "10.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Aloo+Paratha.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:06:39.802735-04:00",
            "updated_at": "2025-10-14T11:06:39.802743-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "0ea59ca6-78b2-44fe-9e2b-acba6df4c580",
            "product_id": "PRDB8E1D40F",
            "name": "Limca",
            "category": "Drinks",
            "subcategory": "353a2670-8285-4d18-bf2c-20765c847d5b",
            "price": "4.00",
            "discount_price": "4.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Drinks/Limca_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:05:37.746852-04:00",
            "updated_at": "2025-10-14T11:05:37.746858-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "70d0cb4e-f814-4f6a-bc0f-d4c4699345eb",
            "product_id": "PRD41BCC476",
            "name": "Red Bull",
            "category": "Drinks",
            "subcategory": "353a2670-8285-4d18-bf2c-20765c847d5b",
            "price": "4.00",
            "discount_price": "4.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Drinks/REd+Bull_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:05:04.419971-04:00",
            "updated_at": "2025-10-14T11:05:04.419979-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "7a65b4b5-3d23-478d-89cf-61b7a35eed59",
            "product_id": "PRD4F5E3B1E",
            "name": "Rose Shake",
            "category": "Drinks",
            "subcategory": "73003b1c-b72e-4d93-95a4-93217b8a95a7",
            "price": "7.00",
            "discount_price": "7.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Deserts/Rose+Shake.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:03:28.330525-04:00",
            "updated_at": "2025-10-14T11:03:28.330531-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "db3ae59e-c070-4f78-9a44-970d3fc5ba13",
            "product_id": "PRD7E5F5BC0",
            "name": "Mango Lassi",
            "category": "Drinks",
            "subcategory": "81ef0012-1df7-4f56-b861-4ec24392a73b",
            "price": "7.00",
            "discount_price": "7.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant%2BItems/Mangoo+Lassi.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:02:36.532971-04:00",
            "updated_at": "2025-10-14T11:02:36.532978-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "444531a9-7544-4fa5-8841-c5334bcb96e7",
            "product_id": "PRDE43E55D9",
            "name": "Pop Can",
            "category": "Drinks",
            "subcategory": "353a2670-8285-4d18-bf2c-20765c847d5b",
            "price": "3.00",
            "discount_price": "3.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Drinks/Crisp%2C+fizzy+.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T11:01:15.059235-04:00",
            "updated_at": "2025-10-14T11:01:15.059243-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "f40c3d93-b815-4c1f-b0e2-a1fcaeab0106",
            "product_id": "PRDA9B8FDAF",
            "name": "Tawa Roti",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "2.00",
            "discount_price": "2.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Gur+Punjabi+Food+Kornor/Tawa+Roti.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 24,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:58:08.060426-04:00",
            "updated_at": "2025-10-14T10:58:08.060432-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "d550969a-b993-41c0-a436-3708ee11f472",
            "product_id": "PRD109FEEB4",
            "name": "Lacha Parantha",
            "category": "Food",
            "subcategory": "ad292445-05a7-4078-9126-a8ff7bd01413",
            "price": "6.00",
            "discount_price": "6.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Paratha.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:56:46.276184-04:00",
            "updated_at": "2025-10-14T10:56:46.276192-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "3b29a290-1e29-47aa-8dec-7f986795c7f9",
            "product_id": "PRDE1A0C2FD",
            "name": "Chilli Naan",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "6.00",
            "discount_price": "6.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Shiva+Sakthi/Chilli+Naan_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:55:59.571772-04:00",
            "updated_at": "2025-10-14T10:55:59.571779-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "a030f3c9-c80e-466e-ada8-6acd8ff4786a",
            "product_id": "PRDE2CB957A",
            "name": "Butter Naan",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "5.00",
            "discount_price": "5.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Butter+Naan.webp",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:54:19.469124-04:00",
            "updated_at": "2025-10-14T10:54:19.469131-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "a9e162f7-7eab-4dbd-80b1-4cd82ec93583",
            "product_id": "PRDAE30C581",
            "name": "Tandoori Roti",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "3.00",
            "discount_price": "3.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Tandoori+Roti.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:53:02.812352-04:00",
            "updated_at": "2025-10-14T10:53:02.812359-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "0e339d5b-c52e-4459-9566-f46269bfd668",
            "product_id": "PRD81E8DF6D",
            "name": "Mutter Pulao",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "10.00",
            "discount_price": "10.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Mutter+Pulao_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:50:56.678004-04:00",
            "updated_at": "2025-10-14T10:50:56.678011-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "b496a266-5665-4fe9-bdf9-cc4fd175f637",
            "product_id": "PRDFA5E8FD0",
            "name": "Steam Rice",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "6.00",
            "discount_price": "6.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Steam+Rice.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:49:42.815503-04:00",
            "updated_at": "2025-10-14T10:49:42.815508-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "faf70100-5a57-4030-ac05-3143f314ed04",
            "product_id": "PRD7EAF57F8",
            "name": "Tawa Pulao",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "12.00",
            "discount_price": "12.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/tawa-pulao_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:47:36.849556-04:00",
            "updated_at": "2025-10-14T10:47:36.849564-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "5a430142-7b73-4cba-b15c-2cf0449354dc",
            "product_id": "PRD42DBD692",
            "name": "Jeera Rice",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "9.00",
            "discount_price": "9.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Jeera+Basmati+Rice_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-14T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:44:07.803292-04:00",
            "updated_at": "2025-10-14T10:44:07.803299-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "79602418-f923-4e58-97ad-15b9249ae4aa",
            "product_id": "PRD641FE0F9",
            "name": "Veg Biryani",
            "category": "Food",
            "subcategory": "4695f1dc-be27-47c9-a368-6dfc98c4c2fc",
            "price": "15.00",
            "discount_price": "15.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Vegetable+Biryani.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:38:38.028679-04:00",
            "updated_at": "2025-10-14T10:39:41.558838-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "43f127be-96c2-46d2-ace2-8ea40509ffab",
            "product_id": "PRD40AE6D0E",
            "name": "Chilli Fish Dry",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Chilli+Fish.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:34:19.270867-04:00",
            "updated_at": "2025-10-14T10:34:19.270874-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "48780d5b-a708-4477-be2b-cc099a191b57",
            "product_id": "PRD7924F6E4",
            "name": "Punjabi Chicken Tikka",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Chicken+Tikka_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:33:14.438760-04:00",
            "updated_at": "2025-10-14T10:33:14.438768-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "38eee094-637f-4312-986c-8422c3086437",
            "product_id": "PRDCD3AC3E7",
            "name": "Chicken Pakora",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Chicken+Pakora.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:32:02.842728-04:00",
            "updated_at": "2025-10-14T10:32:02.842736-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "9b4202e6-1f13-44a2-8f3b-f2d7048c834a",
            "product_id": "PRD97AE1D49",
            "name": "Malai Murgh Tikka",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Snacks/MURGH+MALAI+TIKKA.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:31:14.212721-04:00",
            "updated_at": "2025-10-14T10:31:14.212727-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "71e1bad0-3dd5-4b83-bd24-46c05e26396b",
            "product_id": "PRD201B55FF",
            "name": "Seekh Kabab Chicken",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "17.00",
            "discount_price": "17.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Chicken+Seekh+Kebab_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:29:28.161142-04:00",
            "updated_at": "2025-10-14T10:29:28.161148-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "7293b0c3-95fa-4643-b109-8ff31691b694",
            "product_id": "PRD6CA17034",
            "name": "Peshawari Chicken Tikka",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Chicken_11zon.png",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:28:16.898576-04:00",
            "updated_at": "2025-10-14T10:28:16.898582-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "188de024-4753-4872-821f-a6155e183f22",
            "product_id": "PRDF16498E2",
            "name": "Amritsari Fish Pakora",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Amritsari+Fish.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:27:30.719219-04:00",
            "updated_at": "2025-10-14T10:27:30.719228-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "e006a294-8093-4e15-bed1-e035ae3ea81b",
            "product_id": "PRD71A35A49",
            "name": "Tandoori Momos",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "15.00",
            "discount_price": "15.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Tandoori+Momos_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:26:08.325360-04:00",
            "updated_at": "2025-10-14T10:26:08.325368-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "e23a2fe2-e5f4-4315-bc34-25d4997fcfaf",
            "product_id": "PRDE1158E1E",
            "name": "Steam Momos",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "10.00",
            "discount_price": "10.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Wow+Eats/steam-butter-momos.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:24:55.614047-04:00",
            "updated_at": "2025-10-14T10:24:55.614054-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "4d0ba57a-fed4-43cb-89cd-358461824401",
            "product_id": "PRD463DB257",
            "name": "Gobi Manchurian",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Gur+Punjabi+Food+Kornor/Veggie+Manchurian.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T10:23:36.097281-04:00",
            "updated_at": "2025-10-14T10:23:36.097287-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "02893f96-d995-4005-993a-96b00d348009",
            "product_id": "PRDEA3D2C9B",
            "name": "Palak Paneer",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "17.00",
            "discount_price": "17.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Palak+Paneer.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:32:30.221177-04:00",
            "updated_at": "2025-10-14T00:32:30.221183-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "83d479d8-b5ce-49e9-bc22-fe70e60f9cfe",
            "product_id": "PRD521AA663",
            "name": "Paneer Tikka Masala",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/paneer-tikka-masala.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:31:22.537081-04:00",
            "updated_at": "2025-10-14T00:31:22.537088-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "1cc5acd1-2864-44c4-b82b-d63ad83c40d5",
            "product_id": "PRDC95DF5AB",
            "name": "Paneer Lababdar",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "17.00",
            "discount_price": "17.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Paneer+Lababdar_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:30:29.780499-04:00",
            "updated_at": "2025-10-14T00:30:29.780505-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "6fdfae99-3c75-4c4d-90fc-d5ab02e1362a",
            "product_id": "PRD6D99E94B",
            "name": "Mix Veg",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Mixed+vegetables_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:27:02.414128-04:00",
            "updated_at": "2025-10-14T00:27:02.414135-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "b0453508-a753-4bd9-9e12-2514b8a28610",
            "product_id": "PRDF0D73FE9",
            "name": "Aloo Gobhi",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Aloo+Gobi_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:26:14.769824-04:00",
            "updated_at": "2025-10-14T00:26:14.769831-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "2d0f0bb4-1c13-49a7-a97f-6d737948fc17",
            "product_id": "PRDDE9108A7",
            "name": "Malai Kofta",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Malai+Kofta_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:25:20.492267-04:00",
            "updated_at": "2025-10-14T00:25:20.492276-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "8eaa1724-1d79-4b48-9e4f-4134e84e579d",
            "product_id": "PRD275E059C",
            "name": "Bhindi Do Pyaza",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Bhindi-do-Pyaza_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:24:19.044503-04:00",
            "updated_at": "2025-10-14T00:24:19.044510-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "3a85df23-e5e9-47f3-aed2-d612daa14ee3",
            "product_id": "PRD403BE7D5",
            "name": "Dal Makhani",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "15.00",
            "discount_price": "15.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Chana+Masala_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:23:15.732796-04:00",
            "updated_at": "2025-10-14T00:23:15.732802-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "8b334be8-6222-440a-87da-b92bc2dc8486",
            "product_id": "PRD3CA45252",
            "name": "Shahi Paneer",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Shahi+Paneer.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:21:46.733420-04:00",
            "updated_at": "2025-10-14T00:21:46.733427-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "c21f07ec-98a8-4bf8-a64f-a6bcfb2df8ee",
            "product_id": "PRD1E43F2DF",
            "name": "Punjaabi Paneer Bhurji",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "17.00",
            "discount_price": "17.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/PaneerBhurji.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:20:26.166710-04:00",
            "updated_at": "2025-10-14T00:20:26.166716-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "f55b464b-f20e-4682-91cf-9edbf5ca5696",
            "product_id": "PRDDFD36A09",
            "name": "Amritsari Paneer Kadhai",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "17.00",
            "discount_price": "17.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/AMRITSARI+PANEER+KADHAI_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:19:17.004291-04:00",
            "updated_at": "2025-10-14T00:19:17.004297-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "9c239c70-ce29-4def-85a2-1971105badf9",
            "product_id": "PRD1E0562DE",
            "name": "Dal Tadka",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "15.00",
            "discount_price": "15.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Dhaba+Tadka+Dal_11zon.webp",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:17:59.645247-04:00",
            "updated_at": "2025-10-14T00:17:59.645253-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "79dda3af-507f-4904-af6e-add5c4bdce8d",
            "product_id": "PRD2F029BC4",
            "name": "Saag chicken",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Saag+Chicken_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:16:08.653180-04:00",
            "updated_at": "2025-10-14T00:16:08.653186-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "adef1454-2432-4524-87b6-5afcb0ff8ecf",
            "product_id": "PRDE83DF26D",
            "name": "Lamb Curry",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Lamb+Curry_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:15:21.014899-04:00",
            "updated_at": "2025-10-14T00:15:21.014906-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "046522b5-f2e6-49cd-b708-354b552c26f2",
            "product_id": "PRD93045275",
            "name": "Rara Goat",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "20.00",
            "discount_price": "20.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/RARA+GOSHT+(GOAT+OR+LAMB)_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:14:21.651539-04:00",
            "updated_at": "2025-10-14T00:14:21.651547-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "85931dfd-43cf-46c5-bcf3-459ec4aac5b8",
            "product_id": "PRDBA187DFD",
            "name": "Kadhai Chicken",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/Kadai+Chicken_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:11:52.202783-04:00",
            "updated_at": "2025-10-14T00:11:52.202789-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "adce3342-cbf0-450e-8327-2e64fca4a9a5",
            "product_id": "PRDAC80E734",
            "name": "Butter Chicken",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Butter+Chicken.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:10:29.346794-04:00",
            "updated_at": "2025-10-14T00:10:29.346800-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "235d37f9-fcce-4829-94ab-d5fe417fd980",
            "product_id": "PRD7FFAF66D",
            "name": "Chilli Chicken",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Chilli+Chicken.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:08:51.244055-04:00",
            "updated_at": "2025-10-14T00:09:46.281905-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "2a37e38a-b237-4095-87a6-c5e797b18a08",
            "product_id": "PRD96116F33",
            "name": "Hakka Chowmien Chicken",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant%2BItems/Hakka+Chowmien.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:07:21.872588-04:00",
            "updated_at": "2025-10-14T00:07:21.872595-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "a3da3ca8-3bca-489f-8d85-614f4e25d422",
            "product_id": "PRDE48DF464",
            "name": "Fried Rice Chicken",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Chicken+Fried+Rice.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:04:46.734775-04:00",
            "updated_at": "2025-10-14T00:04:46.734783-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "2ed4cb1b-5df2-4c61-8bab-b81f78ba850e",
            "product_id": "PRD68EB02FC",
            "name": "Veg Fried Rice",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Veg-Fried-Rice_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:03:33.094352-04:00",
            "updated_at": "2025-10-14T00:03:33.094359-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "964e5427-c081-4166-a4ad-8a580d000a83",
            "product_id": "PRD997527FF",
            "name": "Veg Manchurian",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Gur+Punjabi+Food+Kornor/Veggie+Manchurian.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:02:44.260740-04:00",
            "updated_at": "2025-10-14T00:02:44.260747-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "306c3486-111d-49d9-9e40-9174b0d4b0e7",
            "product_id": "PRDA405744C",
            "name": "Hakka Chowmien Veg",
            "category": "Food",
            "subcategory": "bdf8f7e5-ea24-407f-96db-259579d4b75b",
            "price": "15.00",
            "discount_price": "15.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant%2BItems/Hakka+Chowmien.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-14T00:00:30.486148-04:00",
            "updated_at": "2025-10-14T00:00:30.486155-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "72ed17c6-a36c-450b-8c1d-9e5a741b7e6b",
            "product_id": "PRD93FFCDF8",
            "name": "Chicken Tikka Wrap + Pop",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "12.00",
            "discount_price": "12.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Crispy+Chicken+Wrap.webp",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T23:59:00.170066-04:00",
            "updated_at": "2025-10-13T23:59:00.170074-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "db9640d5-7112-40c3-9334-438958100ba7",
            "product_id": "PRD150374DD",
            "name": "Paneer Tikka Wrap + Pop",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "12.00",
            "discount_price": "12.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/restaurants/wrap-veg-panner.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T23:58:01.551790-04:00",
            "updated_at": "2025-10-13T23:58:01.551798-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "67dfac87-8544-469b-a284-a437ef7d6d96",
            "product_id": "PRDB5373E1B",
            "name": "BUTTER CHICKEN + NAAN",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "15.00",
            "discount_price": "15.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Butter+Chicken+with+Two+Butter+Naan+Combo_11zon.png",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T23:56:30.010051-04:00",
            "updated_at": "2025-10-13T23:56:30.010057-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "00ad72db-51c2-457e-b691-c464c2aa9273",
            "product_id": "PRD16DB6961",
            "name": "DAAL MAKHNI + RICE",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "12.00",
            "discount_price": "12.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/DAAL+MAKHNI+%2B+RICE+%2B+POP.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T23:55:14.254977-04:00",
            "updated_at": "2025-10-13T23:55:14.254983-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "95e05c69-92a5-47ab-be05-bae85ace6675",
            "product_id": "PRD0D748D84",
            "name": "GOAT CURRY + RICE + POP",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/GOAT+CURRY+%2B+RICE+%2B+POP.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T23:54:01.247198-04:00",
            "updated_at": "2025-10-13T23:54:01.247206-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "bc3b4d54-bca7-4382-9204-cd55aa6f5e8b",
            "product_id": "PRDBA73001A",
            "name": "CHICKEN CURRY + RICE + POP",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "15.00",
            "discount_price": "15.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Savory+chicken.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T23:52:20.407791-04:00",
            "updated_at": "2025-10-13T23:52:20.407798-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "89824ea4-69b5-4f13-a986-b65cb0ebe36c",
            "product_id": "PRD1AA6C2BA",
            "name": "Tawa Chaap",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "14.00",
            "discount_price": "14.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Main+Biryani/TAWA+SOYA+CHAAP_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:24:36.367706-04:00",
            "updated_at": "2025-10-13T14:24:36.367712-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "5d323ae3-fc17-442f-8260-d0b67ed924f8",
            "product_id": "PRDBF4E1EE4",
            "name": "Achari Chaap",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "15.99",
            "discount_price": "15.99",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant%2BItems/Aachari+Chaap.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:23:27.624195-04:00",
            "updated_at": "2025-10-13T14:23:27.624203-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "b5f1d3ca-07f3-4932-a2d3-dcb18ccfd0fb",
            "product_id": "PRD7F82383B",
            "name": "Chana Bhatura",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "12.00",
            "discount_price": "12.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Gur+Punjabi+Food+Kornor/Chan+Bhatura.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:21:43.454121-04:00",
            "updated_at": "2025-10-13T14:21:43.454128-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "b038fdd6-1827-414c-84c1-144a2473482c",
            "product_id": "PRD85378A97",
            "name": "Gulab Jamun Rabri",
            "category": "Food",
            "subcategory": "5c30006e-ce04-43b7-9756-e24998b1b1cf",
            "price": "8.00",
            "discount_price": "8.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant%2BItems/Gulab+jamun+rabri.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:20:10.840684-04:00",
            "updated_at": "2025-10-13T14:22:04.204751-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "c41eb711-9fa2-4280-a71a-9c074e312ab7",
            "product_id": "PRD7F1DEC1A",
            "name": "Tandoori Chaap",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "14.00",
            "discount_price": "14.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Tandoori+Soya+Chaap.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:18:46.079036-04:00",
            "updated_at": "2025-10-13T14:18:46.079042-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "6c5c1468-53ab-4923-9c2a-a0a71d751786",
            "product_id": "PRD5911AB3A",
            "name": "Chaap Biryani",
            "category": "Food",
            "subcategory": "4695f1dc-be27-47c9-a368-6dfc98c4c2fc",
            "price": "14.00",
            "discount_price": "14.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant%2BItems/Amritsari-Kulcha-Chole_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:12:36.698289-04:00",
            "updated_at": "2025-10-13T14:12:36.698295-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "a6d94bef-9da4-4abe-9b32-7d78737b2763",
            "product_id": "PRD43041CDE",
            "name": "Amritsari Chana Kulcha",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "14.00",
            "discount_price": "14.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant%2BItems/Amritsari-Kulcha-Chole_11zon.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:07:55.710675-04:00",
            "updated_at": "2025-10-13T14:07:55.710683-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "740ef1e0-6025-4eb3-a0c7-fc0481dc8723",
            "product_id": "PRD1DBAB275",
            "name": "Noodle Spring Rolls",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "10.00",
            "discount_price": "10.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Restaurant+Items/Hakka+Spring+Rolls.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T14:06:11.441561-04:00",
            "updated_at": "2025-10-13T14:06:11.441567-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "a55004d7-b89e-4df8-8027-fdff93f8acbe",
            "product_id": "PRD16877124",
            "name": "Non Veg Thali",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "19.00",
            "discount_price": "19.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Handi+Point/Non+Veg+Platter.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T00:28:08.529816-04:00",
            "updated_at": "2025-10-13T00:28:08.529822-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "ac4f0649-18f6-4c3a-bda3-3c1c00561c5c",
            "product_id": "PRD8C45E12C",
            "name": "Veg Thali",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "17.00",
            "discount_price": "17.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Thali.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 27,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T00:27:12.002939-04:00",
            "updated_at": "2025-10-13T00:27:12.002945-04:00",
            "items": 1,
            "is_priority": false
        },
        {
            "id": "9bfd9a7d-82a9-42dc-aaeb-ef2285101d7e",
            "product_id": "PRDBA7C2461",
            "name": "Peri Peri Chaap",
            "category": "Food",
            "subcategory": "a730f158-00a1-4e4e-a86c-acd092cd8eba",
            "price": "16.00",
            "discount_price": "16.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Peri+peri+Chaap.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 45,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T00:25:20.170238-04:00",
            "updated_at": "2025-10-13T00:25:20.170244-04:00",
            "items": 1,
            "is_priority": true
        },
        {
            "id": "c191b735-4216-4ce0-93a9-17c449b2fcfd",
            "product_id": "PRD00CB713E",
            "name": "Garlic naan",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "6.00",
            "discount_price": "6.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/arlic+naan.jpeg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 45,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T00:24:22.312359-04:00",
            "updated_at": "2025-10-13T00:24:22.312366-04:00",
            "items": 1,
            "is_priority": true
        },
        {
            "id": "2b7f41b5-b70c-4d8f-8c46-619b8e79aba1",
            "product_id": "PRD40FABDBE",
            "name": "Butter Naan",
            "category": "Food",
            "subcategory": "5230a05b-2f0e-4906-bfb0-f6c77b306cc0",
            "price": "5.00",
            "discount_price": "5.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Butter+Naan.webp",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 45,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T00:23:34.167729-04:00",
            "updated_at": "2025-10-13T00:23:34.167735-04:00",
            "items": 1,
            "is_priority": true
        },
        {
            "id": "09034605-903a-47cd-bbff-3fd6516976bb",
            "product_id": "PRD61859CBB",
            "name": "Goat Biryani",
            "category": "Food",
            "subcategory": "4695f1dc-be27-47c9-a368-6dfc98c4c2fc",
            "price": "18.00",
            "discount_price": "18.00",
            "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Tandoori+bites/Hyderabadi+Goat+Biryani.jpg",
            "storeName": "Punjabi Chaap House  - Humber",
            "discount_percentage": 45,
            "valid_from": "2025-10-13T06:00:00-04:00",
            "valid_to": "2025-12-31T23:00:00-05:00",
            "product_type": "service",
            "flyer_product": "yes",
            "created_at": "2025-10-13T00:22:10.514356-04:00",
            "updated_at": "2025-10-13T00:22:10.514364-04:00",
            "items": 1,
            "is_priority": true 
}
]
,
    "Bella Italia": [],
    "Spice Garden": [],
    "Sushi Master": [],
    "Burger House": [],
    "Dragon Wok": []
  };

  const restaurants = [
    
    {
    id: 1,
        owner: "fc4743db-dd26-481e-968d-dbda00ae8ed5",
        name: "Punjabi Chaap House  - Humber",
        imageurl: "https://idealmart.s3.ca-central-1.amazonaws.com/restaurants/Punjaabi+Indian+Cuisine+.png",
        mapurl: "https://maps.app.goo.gl/QTxzLyofcPYSGdadA",
        address: "25 Woodbine Downs Blvd, Etobicoke, ON, Canada",
        store_type: "restaurant",
        storeid: "STR23318C",
        email: null
    },
    {
        id: 2,
        owner: "fc4743db-dd26-481e-968d-dbda00ae8ed5",
        name: "Royal Paan - Humber",
        imageurl: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Logos/Humber.png",
        mapurl: "https://maps.app.goo.gl/saYnqZymj2Mnjz978",
        address: "25 Woodbine Downs Blvd, Etobicoke, ON, Canada",
        store_type: "restaurant",
        storeid: "STRE0EDBC",
        email: null
    }
  ];

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedCategory('All');
    setCurrentPage('menu');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedRestaurant(null);
    setSelectedCategory('All');
  };

  const getMenuItems = () => {
    if (!selectedRestaurant) return [];
    const items = productsData[selectedRestaurant.name] || [];
    if (selectedCategory === 'All') return items;
    return items.filter(item => item.category === selectedCategory);
  };

  const getCategories = () => {
    if (!selectedRestaurant) return [];
    const items = productsData[selectedRestaurant.name] || [];
    const categories = [...new Set(items.map(item => item.category))];
    return ['All', ...categories];
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    },
    header: {
      backgroundColor: '#ffffff',
      padding: '16px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 14px',
      backgroundColor: '#e9ecef',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: '#495057',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px 16px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '8px',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '15px',
      color: '#6c757d',
      marginBottom: '32px',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    imageContainer: {
      height: '160px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '70px',
    },
    cardContent: {
      padding: '16px',
    },
    restaurantName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '6px',
    },
    cuisine: {
      fontSize: '13px',
      color: '#6c757d',
      marginBottom: '10px',
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '13px',
      color: '#495057',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    menuContainer: {
      maxWidth: '100%',
    },
    restaurantHeader: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    },
    restaurantIcon: {
      fontSize: '48px',
      marginBottom: '12px',
    },
    restaurantTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '6px',
    },
    restaurantInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '16px',
    },
    infoDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#495057',
      fontSize: '13px',
    },
    filterSection: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    },
    filterHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    filterTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    filterChips: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      overflowX: 'auto',
      paddingBottom: '4px',
    },
    chip: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: '2px solid #e9ecef',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    },
    chipActive: {
      backgroundColor: '#667eea',
      color: '#ffffff',
      borderColor: '#667eea',
    },
    menuList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    menuItem: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      gap: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s',
    },
    menuItemImage: {
      width: '100px',
      height: '100px',
      borderRadius: '8px',
      objectFit: 'cover',
      flexShrink: 0,
      backgroundColor: '#f1f3f5',
    },
    menuItemContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: 0,
    },
    menuItemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '4px',
    },
    menuItemName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      lineHeight: '1.3',
      wordBreak: 'break-word',
    },
    menuItemCategory: {
      fontSize: '12px',
      color: '#6c757d',
      marginBottom: '8px',
    },
    menuItemFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '8px',
    },
    priceContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    menuItemPrice: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#28a745',
    },
    discountBadge: {
      display: 'inline-block',
      backgroundColor: '#ffc107',
      color: '#000',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: 'bold',
    },

    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#6c757d',
    },
    mobileOnly: {
      display: 'none',
    },
  };

  // Mobile responsive styles
  const mobileStyles = `
    @media (max-width: 768px) {
      .grid { 
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
        gap: 16px !important;
      }
      .card-content { padding: 12px !important; }
      .restaurant-name { font-size: 16px !important; }
      .image-container { height: 120px !important; font-size: 50px !important; }
      .menu-item-image { 
        width: 90px !important; 
        height: 90px !important; 
      }
      .filter-chips {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .filter-chips::-webkit-scrollbar {
        display: none;
      }
      .mobile-only { display: block !important; }
    }
  `;

  if (currentPage === 'menu' && selectedRestaurant) {
    const menuItems = getMenuItems();
    const categories = getCategories();

    return (
      <>
        <style>{mobileStyles}</style>
        <div style={styles.container}>
          <header style={styles.header}>
            <div style={styles.headerContent}>
              <button 
                style={styles.backButton}
                onClick={handleBackToHome}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dee2e6'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
              >
                <ArrowLeft size={18} />
                Back
              </button>
            </div>
          </header>
          
          <main style={styles.main}>
            <div style={styles.menuContainer}>
              <div style={styles.restaurantHeader}>
                {/* <div style={styles.restaurantIcon}>{selectedRestaurant.image}</div> */}
                <div style={styles.restaurantIcon}>
                    <img src={selectedRestaurant.imageurl} alt="" style={{width:"265px", height:"150px"}}/>
                </div>
                <h1 style={styles.restaurantTitle}>{selectedRestaurant.name}</h1>
                {/* <p style={styles.cuisine}>{selectedRestaurant.cuisine} • {selectedRestaurant.description}</p> */}
                
                <div style={styles.restaurantInfo}>
                  {/* <div style={styles.infoDetail}>
                    <Star size={16} fill="#ffc107" color="#ffc107" />
                    <span>{selectedRestaurant.rating} Rating</span>
                  </div> */}
                  {/* <div style={styles.infoDetail}>
                    <Clock size={16} />
                    <span>{selectedRestaurant.deliveryTime}</span>
                  </div> */}
                  <div style={styles.infoDetail}>
                    <MapPin size={16} />
                    <span>{selectedRestaurant.address}</span>
                  </div>
                  {/* <div style={styles.infoDetail}>
                    <Phone size={16} />
                    <span>{selectedRestaurant.phone}</span>
                  </div> */}
                </div>
              </div>

              <div style={styles.filterSection}>
                <div style={styles.filterHeader}>
                  <div style={styles.filterTitle}>
                    <Filter size={18} />
                    Filter by Category
                  </div>
                </div>
                <div style={styles.filterChips} className="filter-chips">
                  {categories.map((category) => (
                    <div
                      key={category}
                      style={{
                        ...styles.chip,
                        ...(selectedCategory === category ? styles.chipActive : {})
                      }}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.menuList}>
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <div 
                      key={item.id} 
                      style={styles.menuItem}
                      className="menu-item"
                      onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
                      onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        style={styles.menuItemImage}
                        className="menu-item-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div style={styles.menuItemContent}>
                        <div>
                          <div style={styles.menuItemHeader}>
                            <h3 style={styles.menuItemName}>{item.name}</h3>
                          </div>
                          <div style={styles.menuItemCategory}>{item.category}</div>
                        </div>
                        <div style={styles.menuItemFooter}>
                          <div style={styles.priceContainer}>
                            <div style={styles.menuItemPrice}>
                              ${parseFloat(item.discount_price).toFixed(2)}
                            </div>
                            {/* {item.discount_percentage > 0 && (
                              <span style={styles.discountBadge}>
                                {item.discount_percentage}% OFF
                              </span>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={styles.emptyState}>
                    <p>No items found in this category</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        <NewFooter/>
      </>
    );
  }

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>
              <ChefHat size={28} color="#667eea" />
              <span>DigMe</span>
            </div>
          </div>
        </header>
        
        <main style={styles.main}>
          <h1 style={styles.title}>Pick Your Restaurant</h1>
          {/* <p style={styles.subtitle}>Discover delicious food from our partner restaurants</p> */}
          
          <div style={styles.grid} className="grid">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                style={styles.card}
                onClick={() => handleRestaurantClick(restaurant)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                }}
              >
                <div style={styles.imageContainer} className="image-container">
                  <img src={restaurant.imageurl} alt="" />
                </div>
                <div style={styles.cardContent} className="card-content">
                  <h3 style={styles.restaurantName} className="restaurant-name">{restaurant.name}</h3>
                  {/* <p style={styles.cuisine}>{(restaurant.store_type)}</p> */}
                  <div style={styles.infoRow}>
                    <div style={styles.infoItem}>
                      <LocateFixedIcon size={16}  />
                      <span>{restaurant.address}</span>
                    </div>
                    {/* <div style={styles.infoItem}>
                      <Clock size={16} />
                      <span>{restaurant.deliveryTime}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <NewFooter/>
    </>
  );
};

export default RestaurantMenuUI;