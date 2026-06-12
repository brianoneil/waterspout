import { THICKNESS } from "@/constants/tab-bar";
import { TAB_BAR_COLORS } from "@/constants/tab-bar-colors";
import { ITabBarSurface } from "@/interfaces/tab-bar-surface.interface";
import { strokedArcPath } from "@/lib/stroke-arc-path";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const TabBarSurface: React.FC<ITabBarSurface> = ({
  arc,
  beads,
  width,
  barHeight,
  glass,
}: ITabBarSurface &
  React.ComponentProps<typeof TabBarSurface>): React.ReactNode &
  React.ReactElement => {
  const transform = `translate(${THICKNESS / 2} ${THICKNESS / 2})`;
  const path = strokedArcPath(arc, THICKNESS);

  return (
    <>
      {glass && (
        <GlassContainer spacing={26} style={StyleSheet.absoluteFill}>
          {beads.map((b, i) => (
            <GlassView
              key={i}
              glassEffectStyle="systemChromeMaterial"
              style={[
                styles.bead,
                {
                  left: b.x - THICKNESS / 2,
                  top: b.y - THICKNESS / 2,
                },
              ]}
            />
          ))}
        </GlassContainer>
      )}
      {!glass && (
        <Svg
          style={StyleSheet.absoluteFill}
          width={width}
          height={barHeight + THICKNESS}
        >
          <Path
            d={path}
            transform={transform}
            fill={TAB_BAR_COLORS.surface}
          />
          <Path
            d={path}
            transform={transform}
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth={1}
          />
        </Svg>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bead: {
    position: "absolute",
    width: THICKNESS,
    height: THICKNESS,
    borderRadius: THICKNESS / 2,
  },
});

export { TabBarSurface };
