import { motion } from "framer-motion";

const tabs = [
  {
    icon: "icon-[mdi--paper-outline]",
    name: "General",
  },
  {
    icon: "icon-[material-symbols--layers-outline]",
    name: "Variants",
  },
];

interface SwitcherProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export function TabSwitcher({ selectedTab, setSelectedTab }: SwitcherProps) {
  return (
    <div className="w-full border-b border-border mb-2">
      <div className="flex">
        {tabs.map((t) => {
          const isActive = selectedTab === t.name.toLowerCase();

          return (
            <button
              key={t.name}
              type="button"
              onClick={() => setSelectedTab(t.name.toLowerCase())}
              className={`relative cursor-pointer flex items-center gap-1.5 px-3 py-2 text-base font-medium transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              <span className={`${t.icon} size-4`} />
              {t.name}

              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
