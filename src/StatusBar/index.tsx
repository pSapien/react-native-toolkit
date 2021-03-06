// @flow
import React from 'react';
import { Node } from 'react';
import {
  View, Text, StatusBar as RNStatusBar, StyleSheet,
} from 'react-native';
import SafePadding from '../SafePadding';
import { getTheme } from '../Theme';
import isDark from '../Theme/isDark';

const theme = getTheme();
const componentTheme = theme.StatusBar || theme;
const backgroundColor = componentTheme.primary;
const textColor = componentTheme.onPrimary;

const barStyle = isDark(backgroundColor) ? 'light-content' : 'dark-content';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor,
    paddingTop: Math.min(32, SafePadding.top),
  },
  body: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor,
  },
  title: {
    color: textColor,
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  centered: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

type Props = {
  children?: Node,
};

function Title(title) {
  return (
    <Text allowFontScaling={false} style={styles.title}>{title}</Text>
  );
}

function parseChildren(children) {
  if (typeof children === 'string') {
    return Title(children);
  }
  return children;
}

// eslint-disab le-next-line react/prefer-stateless-function
function StatusBar({ children }: Props) {
  return (
    <View style={styles.container}>
      <RNStatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <View style={styles.body}>
        {parseChildren(children)}
      </View>
    </View>
  );
}

StatusBar.centered = (title, left, right) => {
  return (
    <>
      {Title(title)}
      <View style={styles.centered}>
        {left || <View />}
        {right || <View />}
      </View>
    </>
  );
};

StatusBar.Title = Title;

StatusBar.defaultProps = {
  children: undefined,
};

export default StatusBar;
