import {
    Animated,
    Text as DefaultText,
    RefreshControl as DefaultRefreshControl,
    View as DefaultView,
    ScrollView as DefaultScrollView
} from 'react-native';
import { IconProps as DefaultIconProps } from '@expo/vector-icons/build/createIconSet';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import useDefaultTheme from '../hooks/useDefaultTheme';

export const useThemeColor = (
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type AnimatedViewProps = ThemeProps & Animated.AnimatedProps<DefaultView['props']>
export type IconProps = ThemeProps & DefaultIconProps<string> & { Icon: any };
export type RefreshControlProps = ThemeProps & DefaultRefreshControl['props'];

export const Text = (props: TextProps) => {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return <DefaultText style={[{ color }, { borderColor: color }, style]} {...otherProps} />;
}

export const View = (props: ViewProps) => {
    const { style, lightColor, darkColor, ...otherProps } = props
    const theme = useDefaultTheme()
    const backgroundColor = theme.colors.background

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export const Icon = (props: IconProps) => {
    const { lightColor, darkColor, Icon, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return <Icon color={color} {...otherProps} />
}

export const RefreshControl = (props: RefreshControlProps) => {
    const { lightColor, darkColor, ...otherProps } = props
    const theme = useDefaultTheme()
    const backgroundColor = theme.colors.background
    return <DefaultRefreshControl
        colors={['#33CC88', '#5599FF', '#6677FF']}
        progressBackgroundColor={backgroundColor}
        {...otherProps}
    />
}

export const AnimatedView = (props: AnimatedViewProps) => {
    const { style, lightColor, darkColor, ...otherProps } = props
    const theme = useDefaultTheme()
    const backgroundColor = theme.colors.background

    return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />
}

export const ScrollView = (props: ScrollViewProps) => {
    const { style, lightColor, darkColor, ...otherProps } = props
    const theme = useDefaultTheme()
    const backgroundColor = theme.colors.background

    return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
}