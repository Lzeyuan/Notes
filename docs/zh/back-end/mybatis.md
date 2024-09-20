# MyBatis
## 快速开始


## MyBatis增强工具
相比.net的EF框架，mybatis并不是完美的orm框架，所以有很多增强工具。
### MyBatisPlus
MyBatis 最佳搭档，只做增强不做改变，为简化开发、提高效率而生。
#### 代码生成
详细看[配置文档](https://baomidou.com/reference/new-code-generator-configuration/)
```java
package site.leza.utility;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import com.baomidou.mybatisplus.generator.fill.Column;
import com.baomidou.mybatisplus.generator.fill.Property;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class MyBatisPlusGenerateCode {
    public static void main(String[] args) {
        generateWebAdmin();
    }
    private static void generateWebAdmin() {
        String mysqlUrl = "jdbc:mysql://192.168.1.40:3306/ring" +
                "?useUnicode=true&characterEncoding=utf-8" +
                "&useSSL=false&timezone=Asia/Shanghai";
        String[] tables = {"user", "item"};

        Path rootPath = Paths.get(System.getProperty("user.dir"));
        String entityPath = rootPath + "/model/src/main/java/site/leza/ring/model/entity";

        Path webAdminPath = rootPath.resolve("web/web-admin/src/main");
        String mapperXmlPath = webAdminPath + "/resources/mapper";
        String outputDir = webAdminPath + "/java";

        Map<OutputFile, String> pathInfo = new HashMap<>();
        pathInfo.put(OutputFile.xml, mapperXmlPath);
        pathInfo.put(OutputFile.entity, entityPath);

        FastAutoGenerator.create(mysqlUrl, "leza", "LIZIEN&2024")
                .globalConfig(builder -> builder
                        .author("leza")
                        .commentDate("yyyy-MM-dd")
                        .outputDir(outputDir)
                        .enableSpringdoc()
                        .disableOpenDir()
                )
                .packageConfig(builder -> builder
                        .parent("site.leza.ring")
                        .entity("model.entity")
                        .mapper("mapper")
                        .controller("controller")
                        .pathInfo(pathInfo)
                        .xml("mapper.xml")
                )
                .strategyConfig(builder -> builder
                        .addInclude(tables)
                        .serviceBuilder()
                        // 禁止生成service
                        .disableService()
                        .disableServiceImpl()
                        .controllerBuilder()
                        .enableRestStyle()
                        // 禁止生成controller
                        // .disable()
                        .entityBuilder()
                        // 禁止生成entity
                        // .disable()
                        .enableLombok()
                        .versionColumnName("version")
                        .logicDeleteColumnName("deleted")
                        .addTableFills(new Column("create_time", FieldFill.INSERT))
                        .addTableFills(new Property("updateTime", FieldFill.INSERT_UPDATE))
                )
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();
    }
}

```

### Mapper5
官网[MyBatis Mapper](https://mapper.mybatis.io/)