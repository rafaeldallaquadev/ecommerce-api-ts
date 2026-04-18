import type { RowDataPacket } from "mysql2";
import type { User, SafeUser } from "./user.types.js";
import type { ReturnProduct, SimpleProduct } from "./product.types.js";
import type { CartItems, CartProduct, Order, StockId, UserCart } from "./cart.types.js";
import type { WishlistObj } from "./wishlist.types.js";
export type SafeUserRow = SafeUser & RowDataPacket;
export type UserRow = User & RowDataPacket;
export type ProductRow = ReturnProduct & RowDataPacket;
export type SimpleProductRow = SimpleProduct & RowDataPacket;
export type CartProductsRow = CartProduct & RowDataPacket;
export type CartItemsRow = CartItems & RowDataPacket;
export type UserCartRow = UserCart & RowDataPacket;
export type OrderRow = Order & RowDataPacket;
export type StockRow = StockId & RowDataPacket;
export type WishlistObjRow = WishlistObj & RowDataPacket;
//# sourceMappingURL=mysql.types.d.ts.map