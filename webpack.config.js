import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin'; // Поддерживает только .eslintrc.* формат
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    entry: {
        main: './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true, // аналог CleanWebpackPlugin с Webpack 5
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new ESLintPlugin({
            extensions: ['js', 'ts'],
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        ],

    module: { // Налаштування модулів

        rules: [ // Правила для лоадерів
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },

            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i, // Правило для CSS файлів
                use: [
                    MiniCssExtractPlugin.loader, // Додає CSS до DOM через тег <style>
                    'css-loader',
                    'sass-loader' // Обробляє @import та url()
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i, // Правило для зображень
                type

                    : 'asset/resource', // Генерує URL та виводить файл у директорію
                generator: {
                    filename: 'assets/images/[name].[hash][ext]', // Шаблон імені файлу для зображень
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/i, // Правило для шрифтів
                type: 'asset/resource', // Генерує URL та виводить файл у директорію
                generator: {
                    filename: 'assets/fonts/[name].[hash][ext]', // Шаблон імені файлу для шрифтів
                }
            },
            {
                test: /\.xml$/, // Правило для XML файлів
                use: [
                    'xml-loader' // Перетворює XML у JSON
                ]
            },
            {
                test: /\.csv$/, // Правило для CSV файлів
                use: [
                    'csv-loader' // Перетворює CSV у JSON
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }

        ]

    }
}


