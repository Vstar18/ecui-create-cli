#!/usr/bin/env node
const figlet = require('figlet');
const Printer = require('@darkobits/lolcatjs');
const { program } = require('commander');
const shell = require("shelljs");

const _version = require('../package.json').version;
const versionStr = figlet.textSync('ECUI');
const input = `\n ECUI 脚手架${_version} \n ${versionStr}`;
const transfromed = Printer.default.fromString(input)
const chalk = require('chalk');
const json2ts = require("json2ts");
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');

console.log(transfromed);
program.option('-c, --create<type>', '初始化项目','blue');

const dictionary = {
  create(env) {
    inquirer
    .prompt([
      {
        type:'text',
        message:'请输入文件夹名称',
        name:'dirname'
      }
    ])
    .then(answers => {
      console.log(answers.dirname,'dirname')
      const _pwd = shell.pwd().stdout;
      console.log(_pwd,'_pwd')
      const projectPath = `${_pwd}/${answers.dirname}`;
      shell.rm('-rf',projectPath);
      shell.mkdir(projectPath);
      const spinner = ora('🦀️downloading template......');
      spinner.start();
      const template = 'direct:https://github.com/Vstar18/ecui-template-pc.git';
      download(template,projectPath,{clone:true},function (err) {
        spinner.stop();
        if(err) {
          consolee.log(`${chalk.red('服务器出错了，下载失败！')}`)
        }else{

        }
      })
      // Use user feedback for... whatever!!
    })
    .catch(error => {
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  },
  json2ts(url) {
    //await fetch()
    const result = [
      {
        data:1222,
        name:'zhangsan'
      }
    ]
    const jsonContent = JSON.stringify(result);
    let data = json2ts.convert(jsonContent);
    console.log(data)
  }
}
program.version(transfromed);
program
  .usage('[cmd]<options>')
  .arguments('<cmd>[env]')
  .action(function (cmd,env) {
    console.log(cmd,env)
    const handler = dictionary[cmd];
    if(handler) {
      handler(env);
    }else {
      console.log(`${chalk.blue(cmd)} 🍎 ${chalk.red('暂未支持')}`)
    }
  })





program.parse(process.argv);
