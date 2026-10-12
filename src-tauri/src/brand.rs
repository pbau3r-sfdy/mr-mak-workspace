//! Product name and wording from brand/brand.json (see brand/README.md), compiled in.
use std::sync::LazyLock;

static BRAND: LazyLock<serde_json::Value> = LazyLock::new(|| serde_json::from_str(include_str!("../../brand/brand.json")).expect("brand/brand.json is valid JSON"));

/// A string from brand.json by JSON pointer, e.g. `text("/settings/shortcutLabel")`.
pub fn text(pointer: &str) -> &'static str { BRAND.pointer(pointer).and_then(|value| value.as_str()).unwrap_or_default() }

/// The product name shown in dialogs, menus and the tray ("Mr. Mak" by default).
pub fn name() -> &'static str { text("/name") }

/// The recall shortcut setting, e.g. "⌃⌥Space shows Mr. Mak".
pub fn shortcut_label(shortcut: &str) -> String { text("/settings/shortcutLabel").replace("{shortcut}", shortcut).replace("{name}", name()) }

#[cfg(test)]
mod tests {
    #[test]
    fn default_brand_strings() {
        assert!(!super::name().is_empty());
        assert!(super::shortcut_label("X").starts_with("X "));
    }
}
