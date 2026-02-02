# 🚀 Quick Reference: Dynamic Image Upload & Display

## 📤 Upload Image (Frontend)

```javascript
// 1. Select Image
<input 
  type="file" 
  accept="image/*" 
  onChange={handleImageChange} 
/>

// 2. Upload to Cloudinary
const handleImageUpload = async () => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('http://localhost:5000/files/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  // data.imageUrl ← Use this URL
};

// 3. Save to Database
const productData = {
  name: "Product Name",
  price: 299,
  imageUrl: data.imageUrl,  // ← Cloudinary URL
  // ... other fields
};

await addProduct(productData);
```

---

## 📥 Display Image (Frontend)

```javascript
// Basic Display
<img src={product.imageUrl} alt={product.name} />

// With Error Handling
<img 
  src={product.imageUrl} 
  alt={product.name}
  onError={(e) => e.target.src = 'fallback-image.jpg'}
/>

// Optimized (Cloudinary Transformation)
<img 
  src={product.imageUrl.replace('/upload/', '/upload/w_400,h_300,c_fill/')}
  alt={product.name}
/>
```

---

## 🗄️ Database Structure

```javascript
// MongoDB Product Document
{
  _id: ObjectId("..."),
  name: "Product Name",
  price: 299,
  description: "...",
  imageUrl: "https://res.cloudinary.com/dzpgpscjl/image/upload/v1234567890/uploads/abc123.jpg",
  category: "Electronics",
  stock: 50,
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

---

## 🔌 API Endpoints

```bash
# Upload Image
POST http://localhost:5000/files/upload
Content-Type: multipart/form-data
Body: { image: <file> }
Response: { imageUrl: "https://...", publicId: "..." }

# Add Product
POST http://localhost:5000/products/addProduct
Headers: { Authorization: "Bearer <token>" }
Body: { name, price, description, imageUrl, category, stock }

# Get All Products
GET http://localhost:5000/products/getAllProducts
Headers: { Authorization: "Bearer <token>" }
Response: { products: [...] }

# Get Single Product
GET http://localhost:5000/products/getProduct/:id
Headers: { Authorization: "Bearer <token>" }
Response: { product: {...} }
```

---

## 🎯 Common Use Cases

### 1. Display in Product Card
```javascript
const ProductCard = ({ product }) => (
  <div>
    <img src={product.imageUrl} alt={product.name} />
    <h3>{product.name}</h3>
    <p>${product.price}</p>
  </div>
);
```

### 2. Display in Product List
```javascript
const { data } = useGetAllProductsQuery();

{data?.products?.map(product => (
  <img key={product._id} src={product.imageUrl} />
))}
```

### 3. Display in Detail Page
```javascript
const { id } = useParams();
const { data } = useGetProductQuery(id);

<img src={data?.product?.imageUrl} alt={data?.product?.name} />
```

---

## ⚡ Quick Tips

✅ **Store URLs, not files** in MongoDB  
✅ **Validate file size** (max 5MB recommended)  
✅ **Validate file type** (only images)  
✅ **Use error boundaries** for failed image loads  
✅ **Optimize with Cloudinary** transformations  
✅ **Add loading states** for better UX  

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Image not uploading | Check Cloudinary credentials in `.env` |
| Image not displaying | Verify `imageUrl` is valid URL |
| CORS error | Check backend CORS settings |
| File too large | Compress image or increase limit |
| Wrong file type | Ensure file is an image |

---

## 📝 Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Cloudinary credentials in `.env`
- [ ] MongoDB connected
- [ ] User logged in (for protected routes)
- [ ] Image file selected
- [ ] Image uploaded to Cloudinary
- [ ] URL saved in MongoDB
- [ ] Image displaying in frontend

---

## 🔗 File Locations

- **Upload API**: `server/src/router/files.js`
- **Product Model**: `server/src/model/product.js`
- **Upload Form**: `client/src/pages/AddProduct.jsx`
- **Display Examples**: `client/src/examples/ImageDisplayExamples.jsx`
- **Full Guide**: `IMAGE_UPLOAD_GUIDE.md`

---

**Need help? Check `IMAGE_UPLOAD_GUIDE.md` for detailed explanations!**
