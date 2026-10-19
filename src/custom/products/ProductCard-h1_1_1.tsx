"use client";

import { useEffect, useMemo } from "react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import { cartProductType } from "@/lib/types/cartDataType";
import { formatCurrencyNumber } from "@/utils/formatCurrency";

import Image from "next/image";
import { useState } from "react";
import type { TnewModifierItemSchema } from "@/lib/types/modifierItemType";
import { IoClose } from "react-icons/io5";
import CartButtonAdd from "@/components/AddToCart/CartButtonAdd";

export default function Card({
  product,
  variants,
  allAddOns,
  modifierGroups,
  productModifiers,
}: {
  product: ProductType;
  variants: ProductType[];
  allAddOns: addOnType[];
  modifierGroups: any[];
  productModifiers: any[];
}) {
  type ModifierItem = TnewModifierItemSchema & {
    id: string;
  };
  const { settings } = UseSiteContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductType | null>(null);

  const [selectedModifiers, setSelectedModifiers] = useState<{
    [groupId: string]: any[];
  }>({});

  const shouldOpenPopup =
    product.hasVariants || product.hasModifier;

  const [simpleNoteOpen, setSimpleNoteOpen] = useState(false);

  const [popupNote, setPopupNote] = useState("");
  const [quickNote, setQuickNote] = useState("");

  //  FILTER VARIANTS FOR THIS PRODUCT
  const productVariants = useMemo(() => {
    if (!product.hasVariants) return [];
    return variants
      .filter((v) => v.parentId === product.id)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [product.id, product.hasVariants, variants]);
  const [modifiersLoaded, setModifiersLoaded] = useState(false);

  const productGroupIds = useMemo(() => {
    return productModifiers
      .filter((pm) => pm.productId === product.id)
      .map((pm) => pm.groupId);
  }, [product.id, productModifiers]);

  const productModifierGroups = useMemo(() => {
    return modifierGroups.filter((g) =>
      productGroupIds.includes(g.group.id)
    );
  }, [modifierGroups, productGroupIds]);

  useEffect(() => {
    if (!productModifierGroups.length) return;

    console.log("🍕 Product:", product.name);
    console.log("🔥 FULL GROUPS:", productModifierGroups);
  }, [productModifierGroups]);

  useEffect(() => {
    if (isOpen) {
      setSelectedModifiers({});
      setPopupNote(""); // ✅ reset properly

      if (productVariants.length > 0) {
        setSelectedVariant(productVariants[0]);
      }
    }
  }, [isOpen]);

  // ---------------- PRICE ----------------
  const priceRegular = formatCurrencyNumber(
    product.price ?? 0,
    settings.currency as string,
    settings.locale as string
  );

  const priceTarget =
    product.discountPrice && product.discountPrice > 0
      ? product.discountPrice
      : product.price ?? 0;

  const priceDiscounted =
    product.discountPrice && product.discountPrice > 0
      ? formatCurrencyNumber(
          product.discountPrice,
          settings.currency as string,
          settings.locale as string
        )
      : null;

  const cartProduct: cartProductType = {
    id: product.id,
    uniqueKey:
      product.id.toString() +
      "_" +
      (quickNote?.trim() || ""),
    note: quickNote,
    quantity: 1,
    currentStock: product.currentStock!,
    price: priceTarget,
    basePrice: priceTarget,
    name: product.name,
    image: product.image,
    categoryId: product.categoryId,
    productCat: product.productCat!,
    taxRate: product.taxRate,
    taxType: product.taxType,
  };

  const modifiersFlat = Object.values(selectedModifiers).flat();

  const uniqueKey =
    (selectedVariant?.id ?? product.id) +
    "_" +
    modifiersFlat.map((m) => m.id).sort().join("_") +
    "_" +
    (popupNote?.trim() || "");

  useEffect(() => {
    if (isOpen && productVariants.length > 0) {
      setSelectedVariant(productVariants[0]);
    }
  }, [isOpen, productVariants]);

  const selectedProduct = selectedVariant ?? product;

  const modifiersTotal = Object.values(selectedModifiers)
    .flat()
    .reduce((sum, item) => sum + (item.price ?? 0), 0);

  const basePrice = selectedProduct.price ?? 0;

  const finalPrice = basePrice + modifiersTotal;

  const isValidSelection = productModifierGroups.every((groupData) => {
    const selected = selectedModifiers[groupData.group.id] || [];

    return (
      selected.length >= groupData.group.minSelection &&
      selected.length <= groupData.group.maxSelection
    );
  });

  // ---------------- UI ----------------
  return (
    <>
      <div className="flex flex-col gap-2 bg-[#091f17]/90 w-full md:w-[49%] rounded-2xl shadow-xl p-3 border border-[#f7c82d]/25 backdrop-blur-md transition-all duration-300 hover:border-[#f7c82d]/50 hover:shadow-[0_0_20px_rgba(247,200,45,0.15)]">
        {/* PRODUCT HEADER */}
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-emerald-950/60 border border-[#f7c82d]/20 flex-shrink-0">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-serif font-bold text-white tracking-wide">{product.name}</h3>
            <p className="text-sm text-emerald-100/70 line-clamp-2">{product.productDesc}</p>
            {shouldOpenPopup ? (
              <div className="flex justify-between items-center mt-2">
                <div>
                  {priceDiscounted ? (
                    <>
                      <span className="font-bold text-[#f7c82d]">{priceDiscounted}</span>
                      <span className="line-through ml-2 text-sm text-emerald-200/50">
                        {priceRegular}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-[#f7c82d]">{priceRegular}</span>
                  )}
                </div>

                <div className="bg-[#12382a] p-[1px] rounded-lg border border-[#f7c82d]/30">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-[70px] px-1 py-1 rounded-lg bg-[#f7c82d] font-bold text-black flex items-center justify-center transition-all duration-200 hover:bg-[#fed649] hover:shadow-[0_0_12px_rgba(247,200,45,0.4)]"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-2">
                <div>
                  {priceDiscounted ? (
                    <>
                      <span className="font-bold text-[#f7c82d]">{priceDiscounted}</span>
                      <span className="line-through ml-2 text-sm text-emerald-200/50">
                        {priceRegular}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-[#f7c82d]">{priceRegular}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Note - secondary */}
                  <button
                    onClick={() => {
                      setQuickNote("");
                      setSimpleNoteOpen(true);
                    }}
                    className="text-[#f7c82d]/80 text-xs hover:text-[#f7c82d] transition"
                  >
                    + Note
                  </button>

                  {/* Add - primary */}
                  <CartButtonAdd
                    cartProduct={{
                      ...cartProduct,
                      note: "",
                      uniqueKey: product.id.toString(),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#0c241b] w-[400px] max-w-full rounded-2xl border border-[#f7c82d]/40 shadow-2xl overflow-hidden text-white">
            <div className="w-full max-h-[75vh] overflow-y-auto p-5 pb-2">
              <h2 className="text-lg font-serif font-bold text-[#f7c82d] mb-3">{product.name}</h2>

              {/* VARIANTS */}
              {productVariants.map((variant) => (
                <label
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`flex justify-between items-center p-2.5 rounded-xl cursor-pointer border border-transparent transition-all mb-1 ${
                    selectedVariant?.id === variant.id
                      ? "bg-[#143a2b] border-[#f7c82d]/40 text-white"
                      : "hover:bg-[#102d22] text-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="size"
                      checked={selectedVariant?.id === variant.id}
                      onChange={() => setSelectedVariant(variant)}
                      className="accent-[#f7c82d]"
                    />
                    <span className="text-sm font-medium">{variant.name}</span>
                  </div>

                  <span className="text-sm font-semibold text-[#f7c82d]">
                    {formatCurrencyNumber(variant.price ?? 0)}
                  </span>
                </label>
              ))}

              {/* ✅ MODIFIERS HERE (INSIDE POPUP) */}
              {productModifierGroups.length > 0 && (
                <div className="my-4 border-t border-[#f7c82d]/20 pt-3">
                  {productModifierGroups.map((groupData) => (
                    <div key={groupData.group.id} className="mb-4">
                      <p className="font-serif font-bold text-sm text-[#f7c82d]">
                        {groupData.group.name}
                      </p>

                      <p className="text-xs text-emerald-100/60 mb-2">
                        Min: {groupData.group.minSelection} | Max: {groupData.group.maxSelection}
                      </p>

                      {groupData.items.map((item: ModifierItem) => {
                        const selectedItems = selectedModifiers[groupData.group.id] || [];
                        const isChecked = selectedItems.some((i) => i.id === item.id);

                        const handleChange = () => {
                          setSelectedModifiers((prev) => {
                            const prevItems = prev[groupData.group.id] || [];
                            let updated = [...prevItems];

                            if (groupData.group.maxSelection === 1) {
                              updated = [item];
                            } else {
                              const exists = prevItems.some((i) => i.id === item.id);

                              if (exists) {
                                updated = prevItems.filter((i) => i.id !== item.id);
                              } else if (prevItems.length < groupData.group.maxSelection) {
                                updated.push(item);
                              }
                            }

                            return {
                              ...prev,
                              [groupData.group.id]: updated,
                            };
                          });
                        };

                        return (
                          <label
                            key={item.id}
                            className="flex justify-between items-center py-1.5 px-2 rounded-lg hover:bg-[#102d22] cursor-pointer text-sm text-stone-200"
                          >
                            <span>{item.name}</span>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#f7c82d]">+{item.price}</span>

                              <input
                                type={groupData.group.maxSelection === 1 ? "radio" : "checkbox"}
                                checked={isChecked}
                                onChange={handleChange}
                                className="accent-[#f7c82d]"
                              />
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#f7c82d]/20 bg-[#091a13]">
              {/* 📝 NOTE INPUT */}
              <div className="p-0">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#f7c82d]">
                  Add Note (optional)
                </label>

                <textarea
                  value={popupNote}
                  onChange={(e) => setPopupNote(e.target.value)}
                  placeholder="e.g. less spicy, no onion..."
                  className="w-full mt-1.5 p-2 bg-[#0c241b] border border-[#f7c82d]/30 text-white placeholder-emerald-100/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f7c82d] resize-none"
                  rows={2}
                />
              </div>

              <p className="font-serif font-bold text-right text-base text-white mt-2">
                Total: <span className="text-[#f7c82d]">{formatCurrencyNumber(finalPrice)}</span>
              </p>

              <div className="flex items-center justify-between mt-3 gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl border border-[#f7c82d]/30 bg-[#12382a] text-[#f7c82d] hover:bg-[#d71920] hover:text-white hover:border-[#d71920] transition-colors"
                >
                  <IoClose size={20} />
                </button>

                <div>
                  <CartButtonAdd
                    cartProduct={{
                      id: selectedVariant?.id ?? product.id,
                      uniqueKey: uniqueKey,
                      price: finalPrice,
                      basePrice: selectedVariant?.price ?? product.price ?? 0,
                      name: selectedVariant?.name ?? product.name,

                      quantity: 1,
                      currentStock: selectedVariant?.currentStock ?? product.currentStock!,

                      image: product.image,
                      categoryId: product.categoryId,
                      productCat: product.productCat!,

                      taxRate: selectedProduct.taxRate,
                      taxType: selectedProduct.taxType,

                      parentProductId: product.id,

                      modifiers: Object.values(selectedModifiers).flat(),

                      note: popupNote,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {simpleNoteOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#0c241b] w-[350px] rounded-2xl p-5 shadow-2xl border border-[#f7c82d]/40 text-white">
            {/* Title */}
            <h2 className="font-serif font-bold text-lg mb-3 text-[#f7c82d]">
              {product.name}
            </h2>

            {/* Textarea */}
            <textarea
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              placeholder="e.g. no onion, less spicy..."
              className="w-full bg-[#091a13] border border-[#f7c82d]/30 text-white placeholder-emerald-100/40 rounded-xl p-2.5 h-24 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7c82d] resize-none"
            />

            {/* Buttons */}
            <div className="flex justify-between items-center mt-5 gap-3">
              {/* Cancel */}
              <button
                onClick={() => {
                  setSimpleNoteOpen(false);
                  setQuickNote("");
                }}
                className="border border-[#f7c82d]/30 bg-[#12382a] text-[#f7c82d] hover:bg-[#d71920] hover:text-white hover:border-[#d71920] px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <IoClose size={18} />
              </button>

              {/* Add to cart */}
              <div>
                <CartButtonAdd
                  cartProduct={{
                    ...cartProduct,
                    note: quickNote,
                    uniqueKey: product.id.toString() + "_" + quickNote,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}