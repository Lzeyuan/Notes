# MyBatis
## 快速开始


## MyBatis增强工具
相比.net的EF框架，mybatis并不是完美的orm框架，所以有很多增强工具。
### MyBatisPlus
MyBatis 最佳搭档，只做增强不做改变，为简化开发、提高效率而生。
#### 代码生成
详细看[配置文档](https://baomidou.com/reference/new-code-generator-configuration/)
```java
package site.leza.ring;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import com.baomidou.mybatisplus.generator.fill.Column;
import com.baomidou.mybatisplus.generator.fill.Property;

import java.nio.file.Paths;
import java.util.Collections;

public class MyBatisPlusGenerateCode {
    public static void main(String[] args) {
        String mysqlUrl = "jdbc:mysql://192.168.1.40:3306/ring" +
                "?useUnicode=true&characterEncoding=utf-8" +
                "&useSSL=false&timezone=Asia/Shanghai";
        FastAutoGenerator.create(mysqlUrl, "qweqwe", "asdasd")
                .globalConfig(builder -> builder
                        .author("leza")
                        .outputDir(Paths.get(System.getProperty("user.dir")) + "/src/main/java")
                        .commentDate("yyyy-MM-dd")
                        .enableSwagger()
                )
                .packageConfig(builder -> builder
                        .parent("site.leza.ring")
                        .entity("entity")
                        .mapper("mapper")
                        .pathInfo(Collections.singletonMap(OutputFile.xml, "src/main/resources/mapper"))
                        .xml("mapper.xml")
                )
                .strategyConfig(builder -> builder
                        .serviceBuilder()
                        .disableService()        // 不生成service
                        .disableServiceImpl()    // 不生成service
                        .entityBuilder()
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